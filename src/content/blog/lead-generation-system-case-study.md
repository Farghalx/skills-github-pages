---
title: "We Built an AI Lead Generation System That Finds 250 Qualified Leads in 10 Minutes"
description: "How we replaced 15 hours of manual data scraping with an automated Apify and Claude AI system that runs in the background for $1.50."
date: "2026-03-24T10:00:00Z"
author: "Farghal X"
lang: "en"
slug: "lead-generation-system-case-study"
tags: ["AI lead generation", "automated lead generation for small business", "B2B lead generation automation", "Case Study"]
thumbnail: "/images/blog/lead-generation-system.svg"
---

When it comes to scaling B2B sales, the bottleneck has never been a lack of potential clients in the world. The bottleneck is the excruciating, manual, and soul-crushing process of finding them, verifying their contact info, and sorting the good from the bad.

In Malaysia, we found that the average B2B SDR or agency founder spends roughly 15-20 hours every single week manually searching for leads. They comb through Google Maps, LinkedIn Sales Navigator, and local business directories like a detective. They copy a name. They copy a URL. They try to find an email. Half the time, the email bounces. 

This manual workflow is not just slow; it’s an absolute failure of leverage. Humans are highly intelligent pattern recognizers and negotiators. Using a human to play copy-paste on an Excel spreadsheet is an insult to their potential and a massive leak in your payroll.

So, we decided to build a machine to do it perfectly.

Here is the exact breakdown of how we built an AI lead generation system that finds, validates, and grades 250 highly qualified leads in exactly 10 minutes.

### The Problem: Bad Data, Slow Speed

Before the automation, our client (a software consultancy) was approaching lead gen the hard way:
1. Search LinkedIn for "Marketing Director Malaysia".
2. Open 50 tabs manually.
3. Use a Chrome extension to hopefully find an email.
4. Paste the details into a Google Sheet.

A full day of this might yield 50 emails. When they ran a cold email campaign, 20% of the emails bounced, ruining their domain reputation. Only about 10 leads were actually the right company size.

We needed a system that achieved three things: velocity, enrichment, and strict qualification. It had to run autonomously and output a pristine, error-free Google Sheet.

### The Architecture: Apify + Claude AI

We built a backend pipeline that chains together specialized tools to emulate the behavior of a supercharged human researcher. 

**Step 1: The Scrape (Apify)**
We don't use Chrome extensions. We use Apify actor APIs. The trigger is a simple webhook containing a search parameter. The Apify actor autonomously crawls targeted directories and scrapes the raw data (names, company websites, LinkedIn URLs). Running 100 concurrent threads, it gathered 500 raw URLs in about four minutes.

**Step 2: Deep Enrichment**
A raw website URL isn't a lead. We pass those websites into an enrichment API (like Hunter or Apollo via integration) to pull down the verified contact details of the specific decision-makers.

**Step 3: The AI Brain (Claude)**
This is where the magic happens. A spreadsheet full of names is useless if they aren't qualified. We piped the extracted company descriptions and LinkedIn bios straight into Claude AI (Anthropic's LLM) via API. 

We gave Claude a strict prompt:
> "You are an expert sales qualifier. Read the following company description. Determine if they are a B2B service company. Extract their estimated headcount. Return the data purely as JSON."

### The 100-Point Scoring System

We didn't just want data; we wanted prioritization so the human sales team knew exactly who to call first. We programmed a logic node in the workflow to assign a score out of 100 based on the extracted data:

- **Company Size Match (30 pts):** If they had 10-50 employees, maximum points. 
- **Decision Maker Title (25 pts):** "Founder" or "CEO" got 25 points. "Manager" got 10.
- **Industry Match (25 pts):** Direct B2B services received 25 points.
- **Valid Email (20 pts):** Verified SMTP check directly in the flow. Bounced? 0 points.

The system then automatically tags them into Tiers: Tier A (90+ pts), Tier B (70-89 pts), Tier C (50-69 pts), and Tier D (Trash).

### The Final Output

Everything routes seamlessly into a pre-formatted Google Sheet via the Google Sheets API. 

When we ran the final test sequence, the client watched their previously empty Google Sheet light up. Row after row populated autonomously. 

**The Before:** 3 days of grinding by a human VA.
**The After:** 250 validated, scored, Tier A and B leads deposited directly into the CRM in precisely 10 minutes. 

### The Cost Comparison is Ridiculous

Hiring a general Virtual Assistant to do this manually in Malaysia costs roughly RM2,000 to RM3,000 per month. They get tired, they miss details, and they are slow.

Running 1,000 leads through this entire automated architecture—including the Apify server costs and Claude AI token usage costs—totals approximately $1.50. 

That is not a typo. You are spending one dollar and fifty cents to accomplish what previously took a human a week to bungle.

Automation isn't just a tactic for cost-cutting; it is an entirely unfair competitive advantage. If your competitors are still manually clicking through LinkedIn profiles while you are generating thousands of scored leads while you sleep, it's game over.

This is one of our standard systems at Farghal X. If your sales pipeline is starved because of manual research bottlenecks, stop wasting your team's time. Let us install this engine directly into your business.


![Lead Gen Flow](/images/blog/diagrams/flow-lead.svg)

![Scoring Matrix](/images/blog/diagrams/score-breakdown.svg)