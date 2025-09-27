"use client";

import { useState } from "react";

export default function AdvancedYoga() {
  const YT = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // placeholder video

  const poses = [
    {
      name: "Handstand (Adho Mukha Vrksasana)",
      img: "/images/YOGA IMAGES/ADVANCED/handstand.jpg",
      detail:
        "A challenging inversion for immense upper body & core strength & improved balance & focus.",
      video: YT,
      steps: [
        "Start in Downward Dog, walk feet closer to hands.",
        "Shift weight into hands, shoulders over wrists.",
        "Kick up one leg, then bring both legs overhead.",
        "Engage core, keep gaze slightly forward.",
        "Hold for several breaths, then slowly lower."
      ],
    },
    {
      name: "Forearm Stand (Pincha Mayurasana)",
      img: "/images/YOGA IMAGES/ADVANCED/forearm-stand.jpg",
      detail:
        "Strengthens shoulders, arms, and core while improving balance and flexibility.",
      video: YT,
      steps: [
        "Begin in Dolphin Pose, elbows shoulder-width apart.",
        "Walk feet closer, shift shoulders over elbows.",
        "Kick one leg up, then the other to vertical.",
        "Engage core, keep body aligned.",
        "Lower with control back to the mat."
      ],
    },
    {
      name: "King Pigeon Pose (Eka Pada Rajakapotasana)",
      img: "/images/YOGA IMAGES/ADVANCED/king-pigeon.jpg",
      detail:
        "Deep hip opener and backbend that stretches the thighs, groin, abdomen, and chest.",
      video: YT,
      steps: [
        "From Downward Dog, bring one knee forward, shin angled.",
        "Extend opposite leg straight back, hips square.",
        "Lift chest and arch back, bending rear leg.",
        "Reach arms back to hold foot or ankle.",
        "Breathe deeply, release slowly."
      ],
    },
    {
      name: "Bound Extended Side Angle (Baddha Utthita Parsvakonasana)",
      img: "/images/YOGA IMAGES/ADVANCED/bound-side-angle.jpg",
      detail:
        "Requires deep hip and shoulder flexibility while building leg strength and stability.",
      video: YT,
      steps: [
        "From Warrior II, bend front knee deeply.",
        "Bring front arm inside thigh, reach under leg.",
        "Wrap top arm behind back, clasp hands.",
        "Press into feet, open chest toward ceiling.",
        "Hold for several breaths, then release."
      ],
    },
    {
      name: "Firefly Pose (Tittibhasana)",
      img: "/images/YOGA IMAGES/ADVANCED/firefly.jpg",
      detail:
        "A challenging arm balance that strengthens arms & core, while deeply stretching hamstrings.",
      // Use the embed URL only; the iframe is rendered elsewhere using this src
      video: "https://www.youtube.com/embed/SO0PuSZCXvw",
      steps: [
        "Start in a squat, feet slightly wider than hips.",
        "Thread arms under thighs, palms on floor.",
        "Shift weight into hands, lift feet off floor.",
        "Straighten legs out to sides, keep chest lifted.",
        "Hold briefly, then bend knees to exit."
      ],
    },
    {
      name: "Scorpion Pose (Vrischikasana)",
      img: "/images/YOGA IMAGES/ADVANCED/scorpion.jpg",
      detail:
        "An advanced inversion and backbend requiring significant flexibility, balance, and core control.",
      video: YT,
      steps: [
        "Begin in Forearm Stand against a wall.",
        "Bend knees, point toes toward head.",
        "Lift chest, deepen backbend.",
        "Engage core for stability.",
        "Slowly straighten legs to exit."
      ],
    },
    {
      name: "Compass Pose (Parivrtta Surya Yantrasana)",
      img: "/images/YOGA IMAGES/ADVANCED/compass.jpg",
      detail:
        "Deep seated twist and hamstring stretch improving spinal mobility and leg flexibility.",
      video: YT,
      steps: [
        "Sit with legs extended, bend one knee in.",
        "Thread same-side arm under bent leg.",
        "Grab foot with opposite hand overhead.",
        "Straighten lifted leg, open chest.",
        "Hold and breathe, then switch sides."
      ],
    },
    {
      name: "Full Wheel Pose (Urdhva Dhanurasana)",
      img: "/images/YOGA IMAGES/ADVANCED/full-wheel.jpg",
      detail:
        "A full-body backbend to open the chest, shoulders, and hips, and strengthen arms and legs.",
      video: YT,
      steps: [
        "Lie on back, knees bent, feet hip-width.",
        "Place hands by ears, fingers toward shoulders.",
        "Press into hands and feet, lift hips and chest.",
        "Straighten arms, open shoulders.",
        "Lower slowly to release."
      ],
    },
  ];

  const [selectedPose, setSelectedPose] = useState(null);

  return (
    <div className="flex-1 bg-[#1B2A26] p-6 rounded-xl shadow-lg border border-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        Advanced Yoga Poses
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {poses.map((pose) => (
          <div key={pose.name} className="group w-full h-[360px] [perspective:1000px]">
            <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              {/* Front */}
              <div className="absolute inset-0 rounded-xl overflow-hidden border border-gray-700 shadow-lg [backface-visibility:hidden]">
                <img src={pose.img} alt={pose.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/45 flex items-center justify-center px-3">
                  <h2 className="text-center text-white font-bold">{pose.name}</h2>
                </div>
              </div>

              {/* Back */}
              <div className="absolute inset-0 bg-[#1B2A26] border border-gray-700 rounded-xl shadow-lg p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="text-[#80FF72] font-semibold mb-2">About this pose</h3>
                  <p className="text-gray-300 text-sm leading-6">{pose.detail}</p>

                  <h4 className="text-[#80FF72] font-semibold mt-3 mb-1">Quick steps</h4>
                  <div className="relative h-[110px] overflow-hidden">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      {pose.steps.slice(0, 4).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                    {pose.steps.length > 4 && (
                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#1B2A26] to-transparent" />
                    )}
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => setSelectedPose(pose)}
                    className="w-full bg-[#80FF72] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#6CE464] transition"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPose && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#243832] border border-gray-700 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setSelectedPose(null)}
              className="ml-auto mb-4 block text-white/80 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[#80FF72] mb-4">{selectedPose.name}</h2>
            <div className="aspect-video mb-4">
              <iframe
                className="w-full h-full rounded-lg"
                src={selectedPose.video}
                title={selectedPose.name}
                frameBorder="0"
                allowFullScreen
              />
            </div>
            <h3 className="text-white font-semibold mb-2">Detailed Steps</h3>
            <ul className="list-disc list-inside text-gray-200 space-y-1">
              {selectedPose.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
