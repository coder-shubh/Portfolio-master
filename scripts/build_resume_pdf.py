#!/usr/bin/env python3
"""Generate Resume.pdf optimized for ATS text extraction (ReportLab).

Uses a single-column, mostly table-free layout and standard section headings so
parsers and common resume scanners read text in order. No tool can guarantee
a specific match score (e.g. 99%)—scores depend on the checker and each job
description. This file maximizes structural compatibility; tailor keywords to
each application for best results.
"""
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
OUT_PUBLIC = ROOT / "public" / "Resume.pdf"
OUT_ASSETS = ROOT / "src" / "Assets" / "Resume.pdf"

LINKEDIN_URL = "https://www.linkedin.com/in/shubham-singh-503589203/"
EMAIL = "shubhamsingh00222.ss@gmail.com"

TEXT = colors.HexColor("#111111")
MUTED = colors.HexColor("#444444")


def _footer(canvas, doc):
    canvas.saveState()
    w, _h = doc.pagesize
    y_line = doc.bottomMargin + 10 * mm
    y_text = doc.bottomMargin + 4 * mm
    canvas.setStrokeColor(colors.HexColor("#cccccc"))
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, y_line, w - doc.rightMargin, y_line)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(w - doc.rightMargin, y_text, "Page %d" % doc.page)
    canvas.restoreState()


def build_styles():
    b = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "n",
            parent=b["Normal"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=TEXT,
            spaceAfter=2,
        ),
        "headline": ParagraphStyle(
            "h",
            parent=b["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=13,
            textColor=MUTED,
            spaceAfter=8,
        ),
        "contact": ParagraphStyle(
            "c",
            parent=b["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=TEXT,
            spaceAfter=3,
        ),
        "section": ParagraphStyle(
            "s",
            parent=b["Normal"],
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=TEXT,
            spaceBefore=10,
            spaceAfter=6,
        ),
        "summary": ParagraphStyle(
            "sum",
            parent=b["Normal"],
            fontName="Helvetica",
            fontSize=10,
            leading=13,
            textColor=TEXT,
            spaceAfter=8,
            alignment=TA_LEFT,
        ),
        "keywords": ParagraphStyle(
            "kw",
            parent=b["Normal"],
            fontName="Helvetica",
            fontSize=9,
            leading=12,
            textColor=TEXT,
            spaceAfter=8,
        ),
        "job_head": ParagraphStyle(
            "jh",
            parent=b["Normal"],
            fontName="Helvetica-Bold",
            fontSize=10,
            leading=13,
            textColor=TEXT,
            spaceBefore=8,
            spaceAfter=2,
        ),
        "bullet": ParagraphStyle(
            "bl",
            parent=b["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=12,
            textColor=TEXT,
            leftIndent=14,
            firstLineIndent=-12,
            spaceAfter=3,
        ),
        "proj_name": ParagraphStyle(
            "pn",
            parent=b["Normal"],
            fontName="Helvetica-Bold",
            fontSize=9.5,
            leading=12,
            textColor=TEXT,
            spaceBefore=6,
            spaceAfter=2,
        ),
    }


def build_story(doc):
    st = build_styles()
    story = []

    # ----- Header (linear text — best read order for parsers) -----
    story.append(Paragraph("Shubham Kumar Singh", st["name"]))
    story.append(
        Paragraph(
            "Senior Software Engineer | React Native &amp; Cross-Platform Mobile Development",
            st["headline"],
        )
    )
    story.append(
        Paragraph(
            "Location: Greater Noida, Uttar Pradesh, India",
            st["contact"],
        )
    )
    story.append(
        Paragraph(
            "Phone: +91-9315714082",
            st["contact"],
        )
    )
    story.append(
        Paragraph(
            f"Email: <a href='mailto:{EMAIL}' color='blue'>{EMAIL}</a>",
            st["contact"],
        )
    )
    story.append(
        Paragraph(
            f"LinkedIn: <a href='{LINKEDIN_URL}' color='blue'>{LINKEDIN_URL}</a>",
            st["contact"],
        )
    )

    story.append(HRFlowable(width="100%", thickness=0.75, color=colors.HexColor("#999999")))
    story.append(Spacer(1, 2 * mm))

    # ----- Standard headings many ATS parsers expect -----
    story.append(Paragraph("PROFESSIONAL SUMMARY", st["section"]))
    story.append(
        Paragraph(
            "Senior Software Engineer with 3.6+ years building enterprise and consumer mobile applications. "
            "Expert in <b>React Native</b>, <b>Flutter</b>, and native <b>Android (Kotlin/Java)</b> and "
            "<b>iOS (Swift/Objective-C)</b>. Strong experience with <b>REST APIs</b>, <b>Redux</b>, "
            "<b>BLoC</b>, <b>Provider</b>, <b>CI/CD</b>, <b>App Store</b> and <b>Google Play</b> releases, "
            "<b>biometric authentication</b>, <b>KYC</b>, mentoring, and agile delivery for global clients "
            "including banking, telecom, and healthcare.",
            st["summary"],
        )
    )

    story.append(Paragraph("CORE COMPETENCIES &amp; KEYWORDS", st["section"]))
    story.append(
        Paragraph(
            "React Native, Flutter, JavaScript, TypeScript, Android, iOS, Kotlin, Java, Swift, Objective-C, "
            "Node.js, Express.js, MongoDB, REST API, RESTful API, Redux, BLoC, Provider, MVVM, MVC, Jest, Mocha, "
            "Firebase, Google Maps, Agile, Scrum, CI/CD, Git, GitHub, App Store, Play Store, Google Play, "
            "Xcode, Android Studio, biometric authentication, RBAC, KYC, SDK integration, mobile banking, "
            "enterprise software, cross-platform development, UI/UX collaboration, code review, mentoring, "
            "Python, Azure, automated testing, encryption, blockchain integration.",
            st["keywords"],
        )
    )

    story.append(Paragraph("TECHNICAL SKILLS", st["section"]))
    for line in [
        "Mobile: React Native, Flutter, native Android (Kotlin/Java), iOS (Swift/Objective-C).",
        "Backend: Node.js, Express.js, MongoDB.",
        "Testing: Jest, Mocha; patterns: MVVM, MVC.",
        "Leadership: Team handling, mentoring, project coordination, agile delivery.",
    ]:
        story.append(Paragraph(f"- {line}", st["bullet"]))

    story.append(Paragraph("WORK EXPERIENCE", st["section"]))

    def job_block(title, company, dates, bullets):
        story.append(
            Paragraph(
                f"<b>{title}</b> | {company} | {dates}",
                st["job_head"],
            )
        )
        for b in bullets:
            story.append(Paragraph(f"- {b}", st["bullet"]))
        story.append(Spacer(1, 2 * mm))

    job_block(
        "Senior Software Developer",
        "Invia Pvt. Ltd., Noida",
        "September 2024 – Present",
        [
            "Lead cross-platform mobile development with React Native; collaborate with UI/UX and backend teams.",
            "Implement clean architecture and state management (BLoC, Provider); code reviews and App Store / Play Store releases.",
            "Mentor junior developers.",
        ],
    )
    job_block(
        "Senior Software Engineer",
        "EY (Ernst &amp; Young), Greater Noida",
        "March 2024 – September 2024",
        [
            "Built enterprise mobile apps with React Native, REST APIs, biometric authentication, RBAC.",
            "Improved delivery speed by 35% through agile practices; architecture design and mentoring.",
        ],
    )
    job_block(
        "Software Engineer",
        "Digimonk Pvt Ltd, Noida",
        "August 2023 – March 2024",
        [
            "Healthcare and e-learning apps with React Native; Firebase, Google Maps, payment SDKs.",
            "Reduced load time by 40%; led junior developers on internal projects.",
        ],
    )
    job_block(
        "Software Engineer",
        "Mavesys Infosoft Pvt Ltd, Noida",
        "March 2022 – August 2023",
        [
            "React Native, Flutter, Java, Kotlin for enterprise clients; RESTful APIs and data sync.",
            "Testing reduced post-release bugs by 50%; Play Store deployment and maintenance.",
        ],
    )

    story.append(Paragraph("SELECTED PROJECTS", st["section"]))

    def proj(name, sub, bullets):
        story.append(
            Paragraph(
                f"<b>{name}</b> — {sub}",
                st["proj_name"],
            )
        )
        for b in bullets:
            story.append(Paragraph(f"- {b}", st["bullet"]))

    proj(
        "Enterprise Telecom Account Management",
        "Optus My Fleet Manager / Vodafone NZ Enterprise (Android &amp; iOS)",
        [
            "React Native, Redux, REST APIs; team lead; Play Store and App Store.",
            "Modules: usage monitoring, billing, notifications, multi-account, secure authentication.",
        ],
    )
    proj(
        "Enterprise Identity Verification &amp; KYC",
        "AIS eBiz KYC",
        [
            "React Native, native Android/iOS, biometric SDKs; Face Match, Liveness, OTP, document scanning.",
        ],
    )
    proj(
        "Mobile Identity &amp; Authentication",
        "Bangkok Bank Mobile ID",
        [
            "OTP, PIN, Face Recognition; blockchain-based identity verification with backend team.",
        ],
    )
    proj(
        "Mobile Banking",
        "Bangkok Bank (atta)",
        [
            "React Native maintenance; QR payments, cardless ATM, international transfers.",
        ],
    )
    proj(
        "Career Platform",
        "Azubi Regional",
        [
            "Job search, applications, notifications; React Native and native code.",
        ],
    )
    proj(
        "Learning App",
        "Upwordo – Learn German",
        [
            "Quizzes, audio, REST APIs; UX and cross-platform performance.",
        ],
    )
    proj(
        "Attendance / Geo",
        "Samarpan – Delhi Police",
        [
            "Geo-attendance and verification with React Native; privacy-first APIs.",
        ],
    )
    proj(
        "E-Commerce (Android)",
        "Grannd Store",
        [
            "Native Android (Java), REST APIs; catalog, cart, checkout.",
        ],
    )
    proj(
        "mPoetica",
        "AI image-to-poem (React Native)",
        [
            "Photo upload, poem display, history modules.",
        ],
    )
    proj(
        "mPoster",
        "Poster maker (React Native)",
        [
            "Background removal, drag-and-drop editing, social sharing.",
        ],
    )

    story.append(Paragraph("PROFESSIONAL ACHIEVEMENTS", st["section"]))
    for line in [
        "Automated report system reduced manual effort 60%; Python GUI for email automation.",
        "Shipped high-rated apps (100K+ downloads, 4.5+ stars); mentored 4–6 developers.",
        "Load time improvements up to 40%; CI/CD and automated testing; Flutter migration saved 30%+ time/cost.",
    ]:
        story.append(Paragraph(f"- {line}", st["bullet"]))

    story.append(Paragraph("EDUCATION", st["section"]))
    for line in [
        "Master of Computer Application — Noida Institute of Engineering and Technology, Greater Noida — 2023",
        "Bachelor of Computer Application — Greater Noida Institute of Engineering and Technology — 2021",
        "Relevant coursework: Data Analysis, Azure.",
    ]:
        story.append(Paragraph(f"- {line}", st["bullet"]))

    return story


def main():
    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    OUT_ASSETS.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUT_PUBLIC),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=12 * mm,
        bottomMargin=18 * mm,
        title="Resume - Shubham Kumar Singh",
        author="Shubham Kumar Singh",
    )
    doc.build(build_story(doc), onFirstPage=_footer, onLaterPages=_footer)

    import shutil

    shutil.copy2(OUT_PUBLIC, OUT_ASSETS)
    print(f"Wrote {OUT_PUBLIC}")
    print(f"Copied to {OUT_ASSETS}")


if __name__ == "__main__":
    main()
