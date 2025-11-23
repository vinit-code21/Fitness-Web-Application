"use client";

import { useState } from "react";

export default function BeginnerYoga() {
  const poses = [
    {
      name: "Mountain Pose (Tadasana)",
      img: "/images/YOGA IMAGES/BEGINNER/mountain-pose.jpg",
      detail:
        "Foundation of all standing poses—builds posture, grounding, and alignment.",
      video:
        "https://www.youtube.com/embed/5NxDs-ovJU8?si=uRRhZ87SYAR-rzJr&start=7",
      steps: [
        "Stand with feet together or hip-width; distribute weight evenly.",
        "Engage thighs, lift kneecaps; tailbone lengthens down.",
        "Roll shoulders back and down; chest open, ribs soft.",
        "Arms long by sides, palms forward; chin neutral.",
        "Lift through crown of head; breathe slow and steady.",
      ],
    },
    {
      name: "Child's Pose (Balasana)",
      img: "/images/YOGA IMAGES/BEGINNER/child-pose.jpg",
      detail:
        "Restorative pose that gently stretches back, hips, and thighs; great reset.",
      video:
        "https://www.youtube.com/embed/zStvLHeRnVQ?si=aA5RKiVm12QKmPn&start=7",
      steps: [
        "Kneel, big toes touch, knees wide (or together for narrow fold).",
        "Sit hips toward heels; walk hands forward.",
        "Lower torso between thighs; forehead to mat or block.",
        "Soften shoulders and jaw; lengthen side ribs.",
        "Breathe into back body for 5–10 slow breaths.",
      ],
    },
    {
      name: "Downward-Facing Dog (Adho Mukha Svanasana)",
      img: "/images/YOGA IMAGES/BEGINNER/downward-dog.jpg",
      detail:
        "Full-body stretch + mild inversion; builds shoulder and core strength.",
      video:
        "https://www.youtube.com/embed/UNX2Ao7GpE8?si=ldE43ohubabSJ1cJ&start=7",
      steps: [
        "From tabletop, spread fingers; press through palms.",
        "Tuck toes, lift hips high; lengthen spine.",
        "Soften knees slightly; send sitting bones up and back.",
        "Press heels toward floor; ears between biceps.",
        "Maintain even breath; hold 5–8 breaths.",
      ],
    },
    {
      name: "Warrior II (Virabhadrasana II)",
      img: "/images/YOGA IMAGES/BEGINNER/warrior-2.jpg",
      detail:
        "Strengthens legs and core while opening hips and chest; builds stamina.",
      video:
        "https://www.youtube.com/embed/Mn6RSIRCV3w?si=ckThGSlHtq7tYSni",
      steps: [
        "Take a wide stance; front toes face 12 o’clock, back foot slightly in.",
        "Bend front knee over ankle; back leg strong.",
        "Arms reach parallel to floor; shoulders soft.",
        "Torso centered between legs; tailbone lengthens.",
        "Gaze over front fingers; breathe 5–8 breaths.",
      ],
    },
    {
      name: "Cat–Cow (Marjaryasana–Bitilasana)",
      img: "/images/YOGA IMAGES/BEGINNER/cat-cow.jpg",
      detail:
        "Gentle spinal warm-up improving mobility and breath coordination.",
      video:
        "https://www.youtube.com/embed/Tvz9vv_7_-E?si=9j1E9BVGOzAQqI2q&start=7",
      steps: [
        "Start in tabletop: wrists under shoulders, knees under hips.",
        "Inhale Cow: drop belly, lift chest and tailbone.",
        "Exhale Cat: press floor, round spine, chin to chest.",
        "Flow 6–10 rounds, syncing movement with breath.",
        "Keep arms active and core lightly engaged.",
      ],
    },
    {
      name: "Tree Pose (Vrksasana)",
      img: "/images/YOGA IMAGES/BEGINNER/tree-pose.jpg",
      detail:
        "Balances and strengthens legs/ankles; improves focus and steadiness.",
      video:
        "https://www.youtube.com/embed/uELr6MPi7pI?si=Zv9iR-mn0cXnlOSM&start=7",
      steps: [
        "Stand tall; shift weight to standing leg, root through foot.",
        "Place sole on opposite calf or inner thigh (avoid knee).",
        "Hands to heart or overhead; ribs knit, tailbone long.",
        "Find a steady gaze point; lengthen through crown.",
        "Hold 5–8 breaths; switch sides.",
      ],
    },
    {
      name: "Cobra Pose (Bhujangasana)",
      img: "/images/YOGA IMAGES/BEGINNER/cobra-pose.jpg",
      detail:
        "Gentle backbend that strengthens back and opens chest and abdomen.",
      video:
        "https://www.youtube.com/embed/BwrN55DYr_4?si=jNPKzvsP2Zi3orgE&start=7",
      steps: [
        "Lie prone; legs long, tops of feet down; forehead to mat.",
        "Hands under shoulders; elbows hug ribs.",
        "Inhale, lift chest using back muscles first; light press of hands.",
        "Broad collarbones; shoulders away from ears; neck long.",
        "Exhale lower; repeat 3–5 times.",
      ],
    },
    {
      name: "Seated Forward Bend (Paschimottanasana)",
      img: "/images/YOGA IMAGES/BEGINNER/seated-forward-bend.jpg",
      detail:
        "Elongates hamstrings and spine; encourages calm, introspective breath.",
      video:
        "https://www.youtube.com/embed/YWZv_7TO5TM?si=Rfu_UobvVxW_NQDU&start=7",
      steps: [
        "Sit tall on sit bones; legs extended, feet flexed.",
        "Inhale, reach arms up; lengthen spine.",
        "Exhale, hinge from hips; hands to shins/feet/strap.",
        "Keep spine long; soften at end range.",
        "Hold 5–10 breaths, then slowly rise.",
      ],
    },
  ];

  const [selectedPose, setSelectedPose] = useState(null);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0f1815] rounded-xl text-white border border-[#80FF72]/30 shadow-[0_0_30px_rgba(128,255,114,0.25)] overflow-hidden">
      {/* Header */}
      <header className="p-5 bg-[#121f19]/80 border-b border-[#80FF72]/30 text-center sticky top-0 z-20 backdrop-blur-lg shadow-[0_0_20px_rgba(128,255,114,0.1)]">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] bg-clip-text text-transparent drop-shadow-[0_0_8px_#80FF72]">
          Beginner Yoga Poses
        </h1>
        <p className="text-gray-400 text-sm mt-1 tracking-wide">
          Learn foundational poses with breath and awareness 🌿
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