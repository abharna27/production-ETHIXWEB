import { useState } from "react";
import { Star, ExternalLink, ShieldCheck, Quote } from "lucide-react";
import { REVIEWS, BRAND } from "../content/landing";

export function Proof() {
  const [selectedReview, setSelectedReview] = useState(0);

  return (
    <section id="reviews" className="shell frame relative py-20 md:py-36 border-t border-line">
      {/* Section Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
        <div>
          <div className="measure text-steel flex items-center gap-2 mb-2">
            <span className="text-accent font-bold">07</span>
            <span className="h-px w-6 bg-line" />
            <span>CLIENT REVIEWS</span>
          </div>
          <h2 className="display-2 text-ink max-w-[20ch]">
            Trusted by businesses worldwide.
          </h2>
          <p className="lead mt-4 max-w-xl text-ink-2">
            Real feedback from clients who trusted Ethixweb to design, build, and grow their digital presence.
          </p>
        </div>

        {/* Trustpilot Score Badge Card */}
        <div className="flex items-center gap-4 rounded-2xl border border-line bg-paper-2/60 p-4 px-6 shadow-xs">
          <div>
            <div className="flex items-center gap-1 text-emerald-600 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < 4 ? "fill-emerald-600 text-emerald-600" : "fill-neutral-300 text-neutral-300"}`}
                />
              ))}
            </div>
            <div className="font-display font-bold text-xl text-ink leading-none">
              4.0 <span className="text-xs text-steel font-mono font-normal">/ 5.0</span>
            </div>
          </div>
          <div className="border-l border-line pl-4">
            <span className="font-bold text-sm block tracking-tight text-ink">Trustpilot</span>
            <a
              href={BRAND.trustpilotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
            >
              Verified Profile <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {REVIEWS.map((review, idx) => (
          <div
            key={review.author}
            onClick={() => setSelectedReview(idx)}
            className={`rounded-2xl border p-8 transition-all duration-300 flex flex-col justify-between ${
              selectedReview === idx
                ? "border-accent bg-paper shadow-md"
                : "border-line bg-paper-2/30 hover:border-ink hover:bg-paper"
            }`}
          >
            <div>
              {/* Star Row & Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1 text-accent">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <Quote className="h-5 w-5 text-steel/30" />
              </div>

              {/* Review Text */}
              <p className="text-base text-ink leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>

            {/* Author Footer */}
            <div className="mt-8 pt-4 border-t border-line flex items-center justify-between">
              <div>
                <p className="font-display font-semibold text-sm text-ink">{review.author}</p>
                <p className="text-xs font-mono text-steel">Verified Client · {review.date}</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-emerald-800 dark:text-emerald-400 font-medium">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
