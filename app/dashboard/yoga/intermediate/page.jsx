"use client";

import { useState } from "react";

export default function IntermediateYoga() {
  const YT = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // placeholder video

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
    <div className="flex-1 bg-[#1B2A26] p-6 rounded-xl shadow-lg border border-gray-800">
      <h1 className="text-2xl font-bold mb-6 text-white text-center">
        Intermediate Yoga Poses
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
