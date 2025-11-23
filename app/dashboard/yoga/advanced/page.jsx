"use client";

import { useState } from "react";

export default function advancedYoga() {
  const poses = [
    {
      name: "Handstand (Adho Mukha Vrksasana)",
      img: "/images/YOGA IMAGES/ADVANCED/handstand.jpg",
      detail:
        "A challenging inversion for immense upper body & core strength & improved balance & focus.",
      video: "https://www.youtube.com/watch?v=pnMQLrS5sTE&list=RDpnMQLrS5sTE&start_radio=1",
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
      video: "https://www.youtube.com/watch?v=pnMQLrS5sTE&list=RDpnMQLrS5sTE&start_radio=1",
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
      video: "https://www.youtube.com/watch?v=pnMQLrS5sTE&list=RDpnMQLrS5sTE&start_radio=1",
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
      video: "https://www.youtube.com/watch?v=pnMQLrS5sTE&list=RDpnMQLrS5sTE&start_radio=1",
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
      // Use the embed URL only (remove embedded iframe HTML which broke the JS string)
      video: "https://www.youtube.com/watch?v=pnMQLrS5sTE&list=RDpnMQLrS5sTE&start_radio=1",
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
      video: "https://www.youtube.com/watch?v=pnMQLrS5sTE&list=RDpnMQLrS5sTE&start_radio=1",
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
      video: "https://www.youtube.com/watch?v=pnMQLrS5sTE&list=RDpnMQLrS5sTE&start_radio=1",
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
      video: "https://www.youtube.com/watch?v=pnMQLrS5sTE&list=RDpnMQLrS5sTE&start_radio=1",
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
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0f1815] rounded-xl text-white border border-[#80FF72]/30 shadow-[0_0_30px_rgba(128,255,114,0.25)] overflow-hidden">
      {/* Header */}
      <header className="p-5 bg-[#121f19]/80 border-b border-[#80FF72]/30 text-center sticky top-0 z-20 backdrop-blur-lg shadow-[0_0_20px_rgba(128,255,114,0.1)]">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] bg-clip-text text-transparent drop-shadow-[0_0_8px_#80FF72]">
          Advanced Yoga Poses
        </h1>
        <p className="text-gray-400 text-sm mt-1 tracking-wide">
          Master complex postures and transitions with precision ⚡
        </p>
      </header>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-[#80FF72]/40 scrollbar-track-[#0f1815]/20">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {poses.map((pose) => (
            <div key={pose.name} className="group h-[340px] [perspective:1000px]">
              <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Card */}
                <div className="absolute inset-0 rounded-xl overflow-hidden border border-[#80FF72]/30 bg-[#14241c] [backface-visibility:hidden] shadow-[0_0_20px_rgba(128,255,114,0.15)]">
                  <img
                    src={pose.img}
                    alt={pose.name}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
                  />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center p-3">
                    <h2 className="text-center text-white font-semibold text-lg">
                      {pose.name}
                    </h2>
                  </div>
                </div>

                {/* Back Card */}
                <div className="absolute inset-0 bg-[#142a22]/95 border border-[#80FF72]/30 rounded-xl p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between">
                  <div className="flex-1 overflow-hidden">
                    <h3 className="text-[#80FF72] font-semibold mb-1">About</h3>
                    <p className="text-gray-300 text-sm mb-2 leading-5">{pose.detail}</p>
                    <h4 className="text-[#80FF72] font-semibold mb-1">Steps</h4>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      {pose.steps.slice(0, 3).map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    onClick={() => setSelectedPose(pose)}
                    className="mt-3 w-full bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] text-black font-semibold py-2 rounded-lg hover:scale-105 transition-transform"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPose && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#1b2a25] border border-[#80FF72]/40 rounded-xl p-6 w-full max-w-2xl shadow-[0_0_25px_rgba(128,255,114,0.25)]">
            <button
              onClick={() => setSelectedPose(null)}
              className="ml-auto mb-3 text-white/70 hover:text-white text-xl"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-[#80FF72] mb-3">{selectedPose.name}</h2>
            <div className="aspect-video mb-4 rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={selectedPose.video}
                title={selectedPose.name}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
            <h3 className="text-lg text-[#80FF72] font-semibold mb-2">Detailed Steps</h3>
            <ul className="list-disc list-inside text-gray-200 space-y-1 text-sm">
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
