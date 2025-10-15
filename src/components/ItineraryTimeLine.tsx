import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ItineraryTimeline: React.FC = () => {
  const { data, status, error } = useSelector((state: RootState) => state.itinerary);
  console.log(data, " <=8");
  const itineraryDays = (data as any)?.itinerary?.itinerary ?? null;
  const [expandedByIndex, setExpandedByIndex] = useState<Record<number, boolean>>({});

  const toggleExpanded = (index: number) => {
    setExpandedByIndex(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      {status === "loading" && (
        <div className="max-w-4xl mx-auto space-y-12">
          {[1, 2].map((i) => (
            <div key={i} className="relative">
              <div className="relative z-10 flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-300 animate-pulse rounded-full"></div>
                </div>
                <div className="flex-1 pb-8">
                  <div className="shadow-lg border border-gray-200 rounded-2xl p-6">
                    <div className="h-6 w-1/3 bg-gray-300 animate-pulse mb-4 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 animate-pulse mb-6 rounded"></div>
                    <ul className="space-y-4">
                      {[1, 2, 3].map((j) => (
                        <li key={j} className="flex items-start space-x-3">
                          <div className="w-3 h-3 bg-gray-300 animate-pulse rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-2/3 bg-gray-300 animate-pulse rounded"></div>
                            <div className="h-3 w-1/2 bg-gray-300 animate-pulse rounded"></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {status === "failed" && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}

      {status !== "loading" && status !== "failed" && (!itineraryDays || itineraryDays.length === 0) && (
        <p className="text-center">No itinerary generated yet.</p>
      )}

      {status === "succeeded" && itineraryDays && itineraryDays.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Itinerary</h2>
            <div className="max-w-4xl mx-auto space-y-12">
              {itineraryDays.map(
                (
                  day: {
                    activities: {
                      name: string;
                      time: string;
                      description: string;
                      location: string;
                    }[];
                  },
                  index: number
                ) => {
                  const expanded = !!expandedByIndex[index];
                  return (
                    <div key={index} className="relative">
                      {index !== itineraryDays.length - 1 && (
                        <div
                          className="absolute left-[2.8rem] border-l-4 border-green-400 z-0"
                          style={{ top: "3rem", height: "calc(100% + 2.5rem)" }}
                        ></div>
                      )}

                      <div className="relative z-10 flex gap-6 items-start">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm md:text-base">Day {index + 1}</span>
                          </div>
                        </div>

                        <div className="flex-1 pb-8">
                          <Card className="shadow-lg border border-gray-200 overflow-hidden rounded-2xl hover:shadow-xl transition">
                            <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center">
                              {/* Text Section */}
                              <div className="md:w-2/3 pr-6">
                                <div className={`transition-all duration-500 ${expanded ? "max-h-none" : "max-h-40 overflow-hidden relative"}`}>
                                  <ul className="space-y-4">
                                    {day.activities?.map(
                                      (activity: { name: string; time: string; description: string; location: string }, i: number) => (
                                        <li key={i} className="flex items-start space-x-3">
                                          <div className="w-3 h-3 bg-coral rounded-full mt-2 flex-shrink-0"></div>
                                          <div>
                                            <p className="text-sm font-semibold text-gray-700">{activity.time} - {activity.name}</p>
                                            <p className="text-sm text-gray-500">{activity.description}</p>
                                            {activity.location && (
                                              <p className="text-xs text-gray-400">📍 {activity.location}</p>
                                            )}
                                          </div>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <button
                                  onClick={() => toggleExpanded(index)}
                                  className="mt-4 text-blue-500 font-semibold hover:underline"
                                >
                                  {expanded ? "View Less" : "View More"}
                                </button>
                              </div>

                              {/* Image Section */}
                              {day && (day as any).image && (
                                <div className="md:w-1/3 mt-2 md:mt-0">
                                  <img
                                    src={(day as any).image}
                                    alt={`Day ${index + 1}`}
                                    className="w-full h-48 md:h-30 object-cover rounded-lg shadow-md"
                                    onError={(e) => {
                                      const target = e.currentTarget as HTMLImageElement;
                                      target.onerror = null;
                                      target.src = `https://picsum.photos/seed/day-${index + 1}/800/600`;
                                    }}
                                  />
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ItineraryTimeline;