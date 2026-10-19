import React from 'react';
import { Heart, Sparkles, MapPin, Calendar } from 'lucide-react';
import { Milestone } from '../types';

interface StoryTimelineProps {
  milestones: Milestone[];
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ milestones }) => {
  return (
    <section id="story" className="py-24 px-6 relative max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-20" data-reveal>
        <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#9B4F60] mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Our Journey Through Time</span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#733140] mb-4">
          How Our Forever Began
        </h2>
        <p className="text-sm md:text-base text-[#4A3E3D]/80 font-light">
          Every moment that brought us closer, from our serendipitous first glance to celebrating half a year of married life.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative">
        {/* Central Golden Vine Line */}
        <div
          className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#DFCCA4] via-[#F4A6B8] to-[#D4AF37] transform md:-translate-x-1/2 opacity-70"
          aria-hidden="true"
        />

        <div className="space-y-14 md:space-y-20">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={milestone.id}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Node */}
                <div
                  className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-[#FAF6F0] border-2 border-[#D4AF37] flex items-center justify-center transform -translate-x-1/2 z-20 shadow-md group"
                  aria-hidden="true"
                >
                  <Heart className="w-3.5 h-3.5 fill-[#C47B89] text-[#C47B89] group-hover:scale-125 transition-transform" />
                </div>

                {/* Milestone Card Content */}
                <div
                  data-reveal={isEven ? 'right' : 'left'}
                  className={`w-full md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 ${
                    isEven ? 'md:text-left' : 'md:text-left'
                  }`}
                >
                  <div data-tilt="7" className="tilt-3d glass-card rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl border border-[#E2CBA9]/40 group">
                    {/* Image with delicate frame */}
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-5 bg-[#F9F5EE] border border-[#E2CBA9]/20">
                      <img
                        src={milestone.photoUrl}
                        alt={milestone.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover object-[center_30%] smooth-zoom img-fade-in"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                      
                      {/* Date Badge over image */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1 bg-white/85 backdrop-blur-md rounded-full text-xs font-semibold text-[#733140] shadow-xs">
                        <Calendar className="w-3 h-3 text-[#D4AF37]" />
                        <span>{milestone.date}</span>
                      </div>
                    </div>

                    {/* Milestone Details */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-[#9B4F60]">
                        {milestone.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#D4AF37]" />
                            {milestone.location}
                          </span>
                        )}
                        <span aria-hidden="true">·</span>
                        <span>{milestone.subtitle}</span>
                      </div>

                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#733140]">
                        {milestone.title}
                      </h3>

                      <p className="text-sm text-[#4A3E3D]/85 leading-relaxed font-light">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Empty spacer for opposing side on desktop */}
                <div className="hidden md:block md:w-[calc(50%-2.5rem)]" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
