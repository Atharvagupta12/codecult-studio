"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BASE, EMAIL, KR, PROJECTS } from "./data";
import { MONO, useActions } from "./shared";

type Line = { kind: "cmd" | "out" | "ok" | "err"; text: React.ReactNode };

const PROMPT = (
  <>
    <span style={{ color: KR.green }}>kabir@dev</span> <span style={{ color: KR.blue }}>~</span> <span style={{ color: KR.mute }}>%</span>
  </>
);

const COMMANDS = ["help", "about", "projects", "skills", "experience", "contact", "hire", "resume", "ls", "whoami", "date", "joke", "clear", "cd projects", "sudo hire-me"];

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
  "There are 10 kinds of people: those who understand binary and those who don't.",
  "It works on my machine. ¯\\_(ツ)_/¯ So we ship my machine. 🐳",
];

const INTRO: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "out", text: "Kabir Rao · full-stack developer · Indore, India" },
  { kind: "cmd", text: "cat stack.json" },
  { kind: "ok", text: '{ "frontend": ["React", "Next.js", "TypeScript"], "backend": ["Node", "PostgreSQL"], "cloud": "AWS" }' },
  { kind: "out", text: "Type `help` to explore, or try `hire` 👀" },
];

export function Terminal() {
  const router = useRouter();
  const { hire, resume } = useActions();
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [input, setInput] = useState("");
  const [hist, setHist] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const jokeRef = useRef(0);

  // Intro: print lines one by one
  useEffect(() => {
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      if (i < INTRO.length) {
        const line = INTRO[i++];
        setLines((l) => [...l, line]);
        t = setTimeout(step, line.kind === "cmd" ? 450 : 650);
      } else setReady(true);
    };
    t = setTimeout(step, 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    setHist((h) => [raw, ...h]);
    setHIdx(-1);
    const out: Line[] = [{ kind: "cmd", text: raw }];
    const say = (text: React.ReactNode, kind: Line["kind"] = "out") => out.push({ kind, text });

    switch (cmd) {
      case "help":
        say("Available commands:");
        say(COMMANDS.filter((c) => c !== "sudo hire-me").join("  ·  "), "ok");
        break;
      case "about":
        say("4+ years building fast, reliable products for startups. Senior engineer at a fintech, open-source maintainer, chai enthusiast. ☕");
        break;
      case "projects":
        PROJECTS.forEach((p) =>
          say(
            <button type="button" onClick={() => router.push(`${BASE}/projects/${p.slug}`)} className="text-left hover:underline">
              <span style={{ color: p.accent }}>▸ {p.name}</span> <span style={{ color: KR.mute }}>— {p.tagline}</span>
            </button>,
          ),
        );
        say("Tip: click a project, or run `cd projects`", "ok");
        break;
      case "skills":
      case "stack":
        say("React · Next.js · TypeScript · Node.js · PostgreSQL · Redis · AWS · React Native · Python", "ok");
        break;
      case "experience":
        say("2024–now  Senior Full-stack Engineer @ Finlo");
        say("2022–2024 Full-stack Engineer @ Swiftcart");
        say("2021–2022 Freelance developer, 15+ clients");
        break;
      case "contact":
        say(`email: ${EMAIL}`);
        say("Type `hire` to message me on WhatsApp.", "ok");
        break;
      case "hire":
      case "sudo hire-me":
      case "sudo":
        say(cmd.startsWith("sudo") ? "[sudo] permission granted ✨ great choice." : "Opening WhatsApp…", "ok");
        setTimeout(() => hire(), 350);
        break;
      case "resume":
        say("Downloading resume.pdf…", "ok");
        setTimeout(() => resume(), 350);
        break;
      case "ls":
        say("about.md   projects/   skills.json   resume.pdf   contact.md", "ok");
        break;
      case "whoami":
        say("guest@kabir.dev — but you could be my next client 😉");
        break;
      case "date":
        say(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" }));
        break;
      case "joke":
        say(JOKES[jokeRef.current++ % JOKES.length]);
        break;
      case "cd projects":
      case "cd ~/projects":
        say("→ ~/projects", "ok");
        setTimeout(() => router.push(`${BASE}/projects`), 300);
        break;
      case "clear":
        setLines([]);
        setInput("");
        return;
      default:
        say(`command not found: ${cmd}. Type \`help\` for the list.`, "err");
    }
    setLines((l) => [...l, ...out]);
    setInput("");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") run(input);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.min(hist.length - 1, hIdx + 1);
      if (hist[i] !== undefined) {
        setHIdx(i);
        setInput(hist[i]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = hIdx - 1;
      setHIdx(Math.max(-1, i));
      setInput(i >= 0 ? hist[i] : "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const m = COMMANDS.find((c) => c.startsWith(input.trim().toLowerCase()) && input.trim());
      if (m) setInput(m);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(63,185,80,0.08)]" style={{ borderColor: KR.line, background: "#0D1117" }}>
      <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: KR.line, background: "#161B22" }}>
        <span className="size-3 rounded-full bg-[#FF5F57]" />
        <span className="size-3 rounded-full bg-[#FEBC2E]" />
        <span className="size-3 rounded-full bg-[#28C840]" />
        <span className={`${MONO} mx-auto text-[12px]`} style={{ color: KR.mute }}>
          kabir@dev: ~ — zsh
        </span>
      </div>
      <div
        ref={bodyRef}
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className={`${MONO} h-[300px] cursor-text overflow-y-auto p-4 text-[13px] leading-[1.75] sm:h-[340px] sm:text-[14px]`}
        data-lenis-prevent
      >
        {lines.map((l, i) => (
          <div key={i} className="break-words">
            {l.kind === "cmd" ? (
              <>
                {PROMPT} <span className="text-white">{l.text}</span>
              </>
            ) : (
              <span style={{ color: l.kind === "ok" ? KR.green : l.kind === "err" ? KR.orange : "#C9D1D9" }}>{l.text}</span>
            )}
          </div>
        ))}
        {ready && (
          <label className="flex items-center gap-2">
            <span className="shrink-0">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="type help…"
              className="min-w-0 flex-1 bg-transparent text-white caret-[#3FB950] outline-none placeholder:text-white/25 focus-visible:outline-none"
            />
          </label>
        )}
      </div>
      <div className="flex gap-2 overflow-x-auto border-t px-3 py-2.5 [scrollbar-width:none]" style={{ borderColor: KR.line }}>
        {["help", "projects", "skills", "joke", "hire"].map((c) => (
          <button key={c} type="button" disabled={!ready} onClick={() => run(c)} className={`${MONO} shrink-0 rounded-md border px-2.5 py-1 text-[12px] transition-colors hover:border-[#3FB950] hover:text-[#3FB950] disabled:opacity-40`} style={{ borderColor: KR.line, color: KR.mute }}>
            $ {c}
          </button>
        ))}
      </div>
    </div>
  );
}
