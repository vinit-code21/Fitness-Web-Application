"use client";

import { useState } from "react";

export default function intermediateYoga() {
  const poses = [
    {
      name: "Warrior III (Virabhadrasana III)",
      img: "/images/YOGA IMAGES/INTERMEDIATE/warrior-3.jpg",
      detail:
        "Dynamic balance pose that strengthens legs, glutes, and core while challenging stability.",
      video: "https://www.youtube.com/embed/uEc5hrgIYx4?si=IgDlVzkxjK12UOC3",
      steps: [
        "From standing, hinge forward and lift back leg to hip height.",
        "Keep hips square; point back toes down.",
        "Reach arms forward or to sides; lengthen spine.",
        "Engage core and standing leg; keep steady gaze.",
        "Hold 3–5 breaths, then switch sides."
      ],
    },
    {
      name: "Side Plank (Vasisthasana)",
      img: "/images/YOGA IMAGES/INTERMEDIATE/side-plank.jpg",
      detail:
        "Builds core and shoulder strength with strong lateral stability and balance.",
      video: "https://www.youtube.com/embed/_ByCVx-WxfQ?si=TucEkONV7uXWQdZX",
      steps: [
        "From plank, stack feet and shift weight to one hand.",
        "Press floor away; lift hips; top arm to sky.",
        "Stack shoulders; keep neck long and gaze steady.",
        "Option: bottom knee down or top leg lifted.",
        "Hold 3–5 breaths; switch sides."
      ],
    },
    {
      name: "Bridge Pose (Setu Bandhasana)",
      img: "/images/YOGA IMAGES/INTERMEDIATE/bridge-pose.jpg",
      detail:
        "Strengthens back, glutes, and hamstrings while opening chest and hip flexors.",
      video: "https://www.youtube.com/embed/Nm5qwS_Ps_Q?si=w1-2LWB-jQ4yWFLm&start=7",
      steps: [
        "Lie down, knees bent, feet hip-width close to hips.",
        "Press feet, curl tailbone, lift hips.",
        "Interlace hands under back; roll shoulders under.",
        "Knees track forward; chin off chest.",
        "Hold 5–8 breaths; lower slowly."
      ],
    },
    {
      name: "Chair Pose (Utkatasana)",
      img: "/images/YOGA IMAGES/INTERMEDIATE/chair-pose.jpg",
      detail:
        "Powerful leg and core builder; heats the body and trains upright alignment.",
      video: "https://www.youtube.com/embed/tEZhXr0FuAQ?si=UyFxQcqoJTnsqeLY",
      steps: [
        "From standing, sit hips back like a chair.",
        "Knees track over ankles; weight in heels.",
        "Arms reach up; ribs knit; tailbone long.",
        "Lift chest without arching low back.",
        "Hold 5–8 breaths; stand on inhale."
      ],
    },
    {
      name: "Crow Pose (Bakasana)",
      img: "/images/YOGA IMAGES/INTERMEDIATE/crow-pose.jpg",
      detail:
        "Intro arm balance that develops wrist, arm, and deep core strength.",
      video: "https://www.youtube.com/embed/ja2eab4sWlM?si=NwnbTAACK09tg7Uw",
      steps: [
        "Squat; hands shoulder-width; spread fingers.",
        "Place knees high on triceps; shift weight forward.",
        "Look forward (not down); lift one foot, then both.",
        "Squeeze thighs to arms; engage core strongly.",
        "Hold for a few breaths; step or float back down."
      ],
    },
    {
      name: "Camel Pose (Ustrasana)",
      img: "/images/YOGA IMAGES/INTERMEDIATE/camel-pose.jpg",
      detail:
        "Deep backbend that opens chest, shoulders, and hip flexors; energizing.",
      video: "https://www.youtube.com/embed/_NNnowkcIqU?si=BMhQCsBCnsUp3Lb0",
      steps: [
        "Kneel hip-width; hands to low back (fingers down).",
        "Press hips forward over knees; lift chest.",
        "Option: hands to heels; keep neck long.",
        "Broaden collarbones; breathe steadily.",
        "Exit slowly with chin to chest."
      ],
    },
    {
      name: "Dolphin Pose",
      img: "/images/YOGA IMAGES/INTERMEDIATE/dolphin-pose.jpg",
      detail:
        "Forearm inversion prep strengthening shoulders, lats, and core.",
      video: "https://www.youtube.com/embed/fbxtdLxYQfM?si=pPhLvANGAzi7t3ta&start=45",
      steps: [
        "From forearm plank, walk feet toward elbows.",
        "Lift hips high; press forearms and palms evenly.",
        "Relax neck; gaze between feet or toward knees.",
        "Keep shoulders broad; ribs draw in.",
        "Hold 5–8 breaths; rest in Child’s Pose."
      ],
    },
    {
      name: "Revolved Triangle (Parivrtta Trikonasana)",
      img: "/images/YOGA IMAGES/INTERMEDIATE/revolved-triangle.jpg",
      detail:
        "Twisting standing pose to lengthen hamstrings and spine while toning core.",
      video: "https://www.youtube.com/embed/2hiXY5Sgsgo?si=j_EfDUMYle0_wsK2&start=7",
      steps: [
        "From a short lunge, straighten front leg; hips square.",
        "Hinge forward; opposite hand to shin/block/floor.",
        "Lengthen spine, then twist from mid-back upward.",
        "Top arm reaches up; keep both legs strong.",
        "Breathe 3–5 breaths; switch sides."
      ],
    },
  ];

  const [selectedPose, setSelectedPose] = useState(null);

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#0f1815] rounded-xl text-white border border-[#80FF72]/30 shadow-[0_0_30px_rgba(128,255,114,0.25)] overflow-hidden">
      {/* Header */}
      <header className="p-5 bg-[#121f19]/80 border-b border-[#80FF72]/30 text-center sticky top-0 z-20 backdrop-blur-lg shadow-[0_0_20px_rgba(128,255,114,0.1)]">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#80FF72] to-[#7EE8FA] bg-clip-text text-transparent drop-shadow-[0_0_8px_#80FF72]">
          Intermediate Yoga Poses
        </h1>
        <p className="text-gray-400 text-sm mt-1 tracking-wide">
          Deepen your practice with challenging sequences 💪
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
