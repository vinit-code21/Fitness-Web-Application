"use client";

import { useState } from "react";

export default function BeginnerYoga() {
  const YT = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // placeholder video

  const poses = [
    {
      name: "Mountain Pose (Tadasana)",
      img: "/images/YOGA IMAGES/BEGINNER/mountain-pose.jpg",
      detail:
        "Foundation of all standing poses—builds posture, grounding, and alignment.",
      video: "https://www.youtube.com/embed/5NxDs-ovJU8?si=uRRhZ87SYAR-rzJr&start=7",
      steps: [
        "Stand with feet together or hip-width; distribute weight evenly.",
        "Engage thighs, lift kneecaps; tailbone lengthens down.",
        "Roll shoulders back and down; chest open, ribs soft.",
        "Arms long by sides, palms forward; chin neutral.",
        "Lift through crown of head; breathe slow and steady."
      ],
    },
    {
      name: "Child's Pose (Balasana)",
      img: "/images/YOGA IMAGES/BEGINNER/child-pose.jpg",
      detail:
        "Restorative pose that gently stretches back, hips, and thighs; great reset.",
      video: "https://www.youtube.com/embed/zStvLHeRnVQ?si=aA5RKiVm12QKmPn&start=7",
      steps: [
        "Kneel, big toes touch, knees wide (or together for narrow fold).",
        "Sit hips toward heels; walk hands forward.",
        "Lower torso between thighs; forehead to mat or block.",
        "Soften shoulders and jaw; lengthen side ribs.",
        "Breathe into back body for 5–10 slow breaths."
      ],
    },
    {
      name: "Downward-Facing Dog (Adho Mukha Svanasana)",
      img: "/images/YOGA IMAGES/BEGINNER/downward-dog.jpg",
      detail:
        "Full-body stretch + mild inversion; builds shoulder and core strength.",
      video: "https://www.youtube.com/embed/UNX2Ao7GpE8?si=ldE43ohubabSJ1cJ&start=7",
      steps: [
        "From tabletop, spread fingers; press through palms.",
        "Tuck toes, lift hips high; lengthen spine.",
        "Soften knees slightly; send sitting bones up and back.",
        "Press heels toward floor; ears between biceps.",
        "Maintain even breath; hold 5–8 breaths."
      ],
    },
    {
      name: "Warrior II (Virabhadrasana II)",
      img: "/images/YOGA IMAGES/BEGINNER/warrior-2.jpg",
      detail:
        "Strengthens legs and core while opening hips and chest; builds stamina.",
      video: "https://www.youtube.com/embed/Mn6RSIRCV3w?si=ckThGSlHtq7tYSni",
      steps: [
        "Take a wide stance; front toes face 12 o’clock, back foot slightly in.",
        "Bend front knee over ankle; back leg strong.",
        "Arms reach parallel to floor; shoulders soft.",
        "Torso centered between legs; tailbone lengthens.",
        "Gaze over front fingers; breathe 5–8 breaths."
      ],
    },
    {
      name: "Cat–Cow (Marjaryasana–Bitilasana)",
      img: "/images/YOGA IMAGES/BEGINNER/cat-cow.jpg",
      detail:
        "Gentle spinal warm-up improving mobility and breath coordination.",
      video: "https://www.youtube.com/embed/Tvz9vv_7_-E?si=9j1E9BVGOzAQqI2q&start=7",
      steps: [
        "Start in tabletop: wrists under shoulders, knees under hips.",
        "Inhale Cow: drop belly, lift chest and tailbone.",
        "Exhale Cat: press floor, round spine, chin to chest.",
        "Flow 6–10 rounds, syncing movement with breath.",
        "Keep arms active and core lightly engaged."
      ],
    },
    {
      name: "Tree Pose (Vrksasana)",
      img: "/images/YOGA IMAGES/BEGINNER/tree-pose.jpg",
      detail:
        "Balances and strengthens legs/ankles; improves focus and steadiness.",
      video: "https://www.youtube.com/embed/uELr6MPi7pI?si=Zv9iR-mn0cXnlOSM&start=7",
      steps: [
        "Stand tall; shift weight to standing leg, root through foot.",
        "Place sole on opposite calf or inner thigh (avoid knee).",
        "Hands to heart or overhead; ribs knit, tailbone long.",
        "Find a steady gaze point; lengthen through crown.",
        "Hold 5–8 breaths; switch sides."
      ],
    },
    {
      name: "Cobra Pose (Bhujangasana)",
      img: "/images/YOGA IMAGES/BEGINNER/cobra-pose.jpg",
      detail:
        "Gentle backbend that strengthens back and opens chest and abdomen.",
      video: "https://www.youtube.com/embed/BwrN55DYr_4?si=jNPKzvsP2Zi3orgE&start=7",
      steps: [
        "Lie prone; legs long, tops of feet down; forehead to mat.",
        "Hands under shoulders; elbows hug ribs.",
        "Inhale, lift chest using back muscles first; light press of hands.",
        "Broad collarbones; shoulders away from ears; neck long.",
        "Exhale lower; repeat 3–5 times."
      ],
    },
    {
      name: "Seated Forward Bend (Paschimottanasana)",
      img: "/images/YOGA IMAGES/BEGINNER/seated-forward-bend.jpg",
      detail:
        "Elongates hamstrings and spine; encourages calm, introspective breath.",
      video: "https://www.youtube.com/embed/YWZv_7TO5TM?si=Rfu_UobvVxW_NQDU&start=7",
      steps: [
        "Sit tall on sit bones; legs extended, feet flexed.",
        "Inhale, reach arms up; lengthen spine.",
        "Exhale, hinge from hips; hands to shins/feet/strap.",
        "Keep spine long; soften at end range.",
        "Hold 5–10 breaths, then slowly rise."
      ],
    },
  ];

  const [selectedPose, setSelectedPose] = useState(null);

  return (
    <div className="flex-1 bg-[#1B2A26] p-6 rounded-xl shadow-lg border border-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        Beginner Yoga Poses
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
                {/* Short detail */}
                <div className="flex-1">
                  <h3 className="text-[#80FF72] font-semibold mb-2">About this pose</h3>
                  <p className="text-gray-300 text-sm leading-6">
                    {pose.detail}
                  </p>

                  <h4 className="text-[#80FF72] font-semibold mt-3 mb-1">Quick steps</h4>
                  <div className="relative h-[110px] overflow-hidden">
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                      {pose.steps.slice(0, 4).map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                    {pose.steps.length > 4 && (
                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#1B2A26] to-transparent" />
                    )}
                  </div>
                </div>

                {/* View More button */}
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
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#243832] border border-gray-700 rounded-xl p-6 w-full max-w-2xl">
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
              {selectedPose.steps.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
