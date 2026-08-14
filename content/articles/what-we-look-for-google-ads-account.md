---
title: "What we look for when we open a Google Ads account"
seoTitle: "Google Ads Audit: What We Look At First | Consultico"
excerpt: "The order we actually run a PPC audit in: search terms first, then conversion actions, match types, negative keywords, and where the click finally lands."
date: 2026-08-16
updated: 2026-08-16
category: PPC
type: Article
readTime: 7 min read
review:
  score: 85
  categories:
    content: 21
    seo: 17
    eeat: 17
    technical: 13
    citability: 17
  reviewer: paul
  date: 2026-08-16
  hash: 50355f6a6ed447a6
cta:
  preset: ppc
faqs:
  - question: What should I check first in a Google Ads audit?
    answer: "The search terms report, before anything else. It shows what people actually typed to trigger your ads, as opposed to the keywords you asked for, and the gap between the two is where most wasted spend hides. Filter it to the last 90 days and sort by cost, so the first thing you read is what your budget actually bought."
  - question: Why do my ads still show for searches I added as negative keywords?
    answer: "Because negative keywords don't cover close variants. Google's own documentation states that ads might still show on searches containing close variations of a negative keyword term, so blocking a singular doesn't block the plural and blocking a spelling doesn't block the misspelling. A negative broad keyword also needs every word present before it applies."
  - question: How do I know if my conversion tracking is wrong?
    answer: "Three tells cover most of it. A conversion that fires on a page load rather than a form submission counts anyone who reaches the thank-you page. Phone clicks and form fills counted together with no de-duplication count one person twice. And a conversion action set to Secondary is observation-only, so it isn't guiding bidding even though the account looks busy."
  - question: How often should the search terms report be reviewed?
    answer: "Weekly for an active account, and more often in the first month after launch or after any structural change. It isn't a long job once the obvious waste is gone. The reason to keep the cadence is that the queries matching your keywords change continuously, so a negative keyword list built once is a snapshot of searches somebody saw a long time ago."
  - question: Are published Google Ads benchmarks useful for a UK business?
    answer: "Only as a rough direction. The most-quoted set is WordStream's 2026 study, and every figure in it comes from US-based campaigns priced in dollars, with medians reported across 23 industries that each contain enormous internal variation. A UK advertiser is better off comparing the account against its own previous quarter on the same campaigns."
---

The first thing I open in a new Google Ads account isn't the dashboard. It's the search terms report, set to the last 90 days and sorted by cost, because until I know what people actually typed to trigger these ads, every other number in the account is describing something I can't see. What follows is the order we run a PPC audit in and what we're reading for at each step. It's a first look rather than a full account review, and it's the version you can run on your own account in an afternoon.

> **The short version:** read the search terms report before anything else, then check the conversion actions are counting a real enquiry, then match types, then the negative keyword list, then click your own ads, and change no bids until the first two are trustworthy.

## The search terms report, before anything else

The search terms report shows what people typed. The keywords report shows what you asked for. They're two different documents, and the distance between them is where the money goes.

Google's own description repays a careful read. The report shows "search terms that a significant number of people have used, and that resulted in your ad being shown" ([Google Ads Help](https://support.google.com/google-ads/answer/2472708)). Two limits are sitting inside that sentence. It only covers queries with enough volume to clear Google's reporting threshold, so a long tail of one-off searches never appears anywhere. And what you're reading is a sample of the demand, not a census of it.

Reading it, I'm sorting the rows into four piles:

- **Spend, no conversions, over a window long enough to mean something.** Not one week. One week of nothing is noise.
- **Adjacent but wrong.** A gas engineer's account picking up "boiler engineer jobs" is paying for someone looking for employment. From the outside that query looks like the business, and the person behind it is after a job.
- **A different service entirely.** Repair queries landing in an installation campaign, commercial queries landing in a domestic one.
- **Intent giveaways.** Free, DIY, cheap, second hand, salary, courses, "how to". Each of those is a person who was never going to ring.

Almost every account we pick up has a pile three or four times bigger than the owner expects, and it's rarely because somebody made a bad bidding decision. It's because this report is where you find out, and nobody had it open often enough.

## Are the conversion actions counting a real enquiry?

Second tab, and it still isn't bids. It's Goals.

An account can look entirely healthy and be measuring nothing. Three versions turn up repeatedly. A conversion fires on a page load rather than a form submission, so anyone who lands on the thank-you URL counts, including the person who arrives there from a bookmark. Phone clicks and form fills are counted alongside each other with no de-duplication, so one determined customer counts twice. And a conversion action that everyone assumes is driving the bidding is set to Secondary.

That last one is worth stating precisely, because Google does. Its documentation says: "Correctly configuring your conversion actions as Primary (biddable) or Secondary (observation-only) is critical. Misconfiguring these settings can prevent Smart Bidding from optimizing effectively, as the algorithm relies on these signals to improve your campaign performance" ([Google Ads Help](https://support.google.com/google-ads/answer/6095821)). Secondary actions exist to be watched, not optimised towards. An account bidding hard towards a Primary action that fires on a newsletter signup is doing exactly what it was told to do.

The check itself takes about ten minutes. Open every conversion action in turn and ask two questions: what physically has to happen for this to fire, and is that thing worth money to the business? Any action where you can't answer both, treat every figure above it as decoration until you can.

## What "exact match" actually means now

Third, match types, and mostly what I'm checking is whether whoever built the account still believes what the brackets used to mean.

Google's current definitions are looser than the names suggest. On exact match, "ads may show on searches that have the same meaning or same intent as the keyword". On phrase match, "ads may show on searches that include the meaning of your keyword". On broad match, "ads may show on searches that are related to your keyword, which can include searches that don't contain the direct meaning of your keywords", and broad is the default every keyword gets unless somebody changed it ([Google Ads Help](https://support.google.com/google-ads/answer/7478529)).

Meaning is carrying a lot of weight in all three. So the question isn't which match types are in use. It's whether the search terms report agrees that Google's reading of meaning matches yours. In a specialist account it often doesn't. A firm that fits one particular kind of flooring and a firm that fits every kind of flooring look like the same intent to a system reading for meaning, and only one of them can take the job.

## The negative keyword list, and the gap in most of them

Fourth, negatives. Most accounts have a list. Fewer have a list doing what its author thinks it's doing. Three limits are documented by Google and all three have cost somebody money in front of me:

- **Negatives don't cover close variants.** "Negative keywords don't match to close variants, so your ad might still show on searches or pages that contain close variations of your negative keyword terms" ([Google Ads Help](https://support.google.com/google-ads/answer/2453972)). Block the singular and the plural is still live. Block the correct spelling and the misspelling is still live.
- **A negative broad keyword needs every term present.** If the search contains only some of the words in it, the ad can still show.
- **There's a length cut-off.** On searches running past 16 words, a negative appearing after the sixteenth word may not apply.

None of that makes negative keywords less useful, and I'd rather have a flawed list than none. It means a list built once at launch is a snapshot of the searches somebody saw at launch, and the report from step one is the only thing that keeps it honest.

## Where the click lands

By now the account has usually explained itself, so the last thing I look at isn't in Google Ads at all.

I click the ads. All of them, on a phone. Is the promise in the ad the first thing on the page, or has the click landed somewhere that mentions it in paragraph four? Is the next action visible without scrolling? Is the phone number a link rather than an image? The most common finding is a campaign for one service pointing at a homepage listing nine of them, and it stays invisible in the account for a long time, because the clicks are cheap and the conversion rate is just quietly poor.

The other half of this sits outside the website. An account can be well built, correctly measured and pointed at a decent page, and still be a bad investment because nobody rings the enquiries back the same day. That isn't a Google Ads problem, and it will show up as one.

## Is the account underperforming, or is this what the market costs?

Worth asking before anyone concludes the account is broken, and harder to answer than it sounds, because there's very little published UK benchmark data.

The most-quoted set is WordStream's, published in 2026. It gives a $5.42 cost per click, an 8.18% conversion rate and a $66.69 cost per lead, reported as medians across 23 industries ([WordStream](https://www.wordstream.com/blog/2026-google-ads-benchmarks), 2026). Every one of those figures comes from 13,474 US-based search campaigns priced in dollars, running in the year to 31 March 2026, so what carries across to a UK advertiser is the shape rather than the amount. A median across an industry also hides enormous variation inside it, which is exactly the variation you're trying to judge.

What we do instead is compare the account against itself. Cost per enquiry this quarter against last quarter, on the same campaigns, counting the same conversion actions. That comparison stays honest even when the benchmark doesn't travel.

## What we leave alone in the first week

Two things stay exactly where they are while the steps above happen.

**Bid strategies.** Changing one sends the system back to learning from the same signals nobody has verified yet. If the measurement is wrong, fix the measurement and let the account gather data on a number that means something.

**Budgets, up or down.** A budget change on an account you don't understand yet alters the evidence you're trying to read. At this stage we're reading the account rather than changing it, and the urge to be seen doing something in week one is how accounts end up with a history nobody can interpret afterwards.

## Running this on your own account

All five steps are yours to do. Search terms report first, 90 days, sorted by cost. Conversion actions second, one at a time, asking what has to physically happen for each one to fire. Then match types against what the report says people actually typed, then the negative list against the same report, then click your own ads on a phone.

If you get to the end of that and the account still doesn't make sense, the problem is usually upstream of the ads. The accounts we run that work best are boring ones, including a gas and heating business where the ads sit alongside the website and everything else, and somebody looks at these five things every week.

If you'd like us to go through yours, [our PPC service](/ppc) starts with exactly this, or [tell us what you're running](/contact) and we'll take a look. If you're not certain paid search is where your next customer comes from, [Think First](/think-first) is the conversation for that, and [how to choose a PPC agency](/articles/how-to-choose-a-ppc-agency-uk) covers hiring someone else to do the work.
