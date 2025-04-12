"use client";

import { Terminal, MessageSquare, BarChart, BrainCircuit, ChevronRightCircle } from 'lucide-react';
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";

export function GlowingGrid() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<Terminal className="h-4 w-4 text-[#FFE066]" />}
        title="Mock Interviews"
        description="Practice with AI-powered domain-specific interview questions tailored to your career path and experience level."
      />
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<MessageSquare className="h-4 w-4 text-[#FFE066]" />}
        title="Real-time Feedback"
        description="Get instant scoring on your interview responses with detailed metrics for technical knowledge, communication skills, and confidence."
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<BarChart className="h-4 w-4 text-[#FFE066]" />}
        title="Performance Analytics"
        description="Track your growth with comprehensive analytics dashboards showing your progress across multiple interview dimensions over time."
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<BrainCircuit className="h-4 w-4 text-[#FFE066]" />}
        title="AI Coaching"
        description="Receive personalized advice on how to improve your interview performance based on your specific strengths and weaknesses."
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<ChevronRightCircle className="h-4 w-4 text-[#FFE066]" />}
        title="Guided Practice Path"
        description="Follow a structured interview preparation journey with increasing difficulty levels to systematically build your interview confidence."
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-[#252641] p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
          variant="cyan"
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-[#252641] bg-[#121327] p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-[#252641] bg-[#1A1B31] p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-['Urbanist'] tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-[#E2E4ED]">
                {title}
              </h3>
              <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-['Urbanist'] text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-[#E2E4ED]/70">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}; 