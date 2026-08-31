import React, { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import Section from "./Section";
import { config } from "../config";

type ContactKey = "email" | "wechat";

const copyText = async (value: string) => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
};

const KeepExploring: React.FC = () => {
  const fieldRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<number>();
  const [copied, setCopied] = useState<ContactKey | null>(null);

  const contacts = [
    {
      key: "email" as const,
      label: "Email",
      hint: "Copy address",
      value: config.contactEmail,
      icon: Mail,
    },
    {
      key: "wechat" as const,
      label: "WeChat",
      hint: "Copy ID",
      value: config.contactWechat,
      icon: MessageCircle,
    },
  ];

  useEffect(() => () => window.clearTimeout(resetTimerRef.current), []);

  const copyContact = async (key: ContactKey, value: string) => {
    if (!value) return;

    try {
      await copyText(value);
      setCopied(key);
      window.clearTimeout(resetTimerRef.current);
      resetTimerRef.current = window.setTimeout(() => setCopied(null), 1700);
    } catch {
      setCopied(null);
    }
  };

  const moveField = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const field = fieldRef.current;
    if (!field) return;

    const rect = field.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    field.style.setProperty("--field-x", `${x}px`);
    field.style.setProperty("--field-y", `${y}px`);
    field.classList.add("is-pointer-active");
  };

  const leaveField = () => fieldRef.current?.classList.remove("is-pointer-active");

  const moveNode = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    node.style.setProperty("--magnet-x", `${x * 0.11}px`);
    node.style.setProperty("--magnet-y", `${y * 0.11}px`);
  };

  const resetNode = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.style.setProperty("--magnet-x", "0px");
    event.currentTarget.style.setProperty("--magnet-y", "0px");
  };

  return (
    <Section id="keep-exploring" className="portfolio-surface explore-section" fullBleed>
      <div className="contact-magnetic mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-20 md:px-10">
        <header className="contact-heading">
          <p className="section-kicker">05 · CONTACT</p>
          <h2 className="portfolio-title mt-4">Keep Exploring with Me</h2>
        </header>

        <div
          ref={fieldRef}
          className="contact-field"
          onPointerMove={moveField}
          onPointerLeave={leaveField}
        >
          {contacts.map(({ key, label, hint, value, icon: Icon }) => {
            const isCopied = copied === key;
            return (
              <button
                key={key}
                type="button"
                className={`contact-node contact-node-${key} ${isCopied ? "is-copied" : ""}`}
                onPointerMove={moveNode}
                onPointerLeave={resetNode}
                onClick={() => copyContact(key, value)}
                aria-label={`复制${label}`}
              >
                <span className="contact-node-icon"><Icon /></span>
                <strong>{isCopied ? "Copied ✓" : label}</strong>
                <small>{isCopied ? "Saved to clipboard" : hint}</small>
                <span className="contact-node-arrow" aria-hidden="true">↗</span>
              </button>
            );
          })}
        </div>

        <p className="contact-copy-status" aria-live="polite">
          {copied ? `${copied === "email" ? "Email" : "WeChat"} copied to clipboard` : ""}
        </p>
        <p className="contact-footnote">© Cindy</p>
      </div>
    </Section>
  );
};

export default KeepExploring;
