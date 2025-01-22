import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, collection } from "../firebase";
import { doc, getDoc, getDocs } from "firebase/firestore";
import CloseIcon from "@mui/icons-material/Close"
import AnimatedBackground from "./Background";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
  UsersRound,
  ChartNoAxesCombined,
  CalendarCheck2,
  TabletSmartphone,
  ScanSearch,
} from "lucide-react";
import Swal from "sweetalert2";
import ImageModal from "./ImageModal";
import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};


const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];

  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-tr from-blue-600/10 to-cyan-600/10 rounded-xl border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400 group-hover:text-blue-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-blue-300/90 group-hover:text-blue-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-1.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-[#1659f5] to-[#14ace3] group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};
const ContentItem = ({content}) => {
  return (
    <div className="pt-0 mt-0" style={{marginTop:"0px"}}>
      <div className="text-center prose prose-invert max-w-none">
        <p className="text-xl font-bold md:text-3xl bg-gradient-to-r from-[#87abff] to-[#5279bf] bg-clip-text text-transparent leading-relaxed">
          {content.Title ? content.Title : ""}
        </p>
      </div>
      <div className="relative mx-auto w-5/6 w-fit flex-grow rounded-2xl my-4 overflow-hidden border border-white/10 shadow-2xl group">
        <img
          src={content.Img}
          alt={content.Title}
          className="w-full max-h-96 object-contain transform transition-transform duration-700 will-change-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl "/>
        <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#030014BB] h-1/2 max-h-44 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      {content.Text?.map((text)=>(
        <div className="prose prose-invert max-w-none">
          <p className="indent-10 pb-5 text-justify text-base md:text-lg text-gray-300/90 leading-relaxed">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
};
const ScreenshotGrid = ({screenshots, OnClicked}) => {
  return (
    screenshots.length > 0 ? (
      <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-5 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300"
      style={{marginTop:"0px"}}>
        <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3 group">
          <TabletSmartphone className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
          Screenshots
        </h3>
        {screenshots.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {screenshots.map((image,index) => (
            <div key={index} className="mb-4 max-w-[70%] break-inside=avoid overflow-hidden rounded-lg group">
              <div className="relative" style={{marginTop:"0px"}}>
                <img src={image} 
                className="w-full object-cover transform blur-none transition-all duration-500 will-change-transform group-hover:blur-[2px] group-hover:scale-105"
                onClick={() => OnClicked(image)}/>
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/100 transition-colors duration-300 rounded-lg pointer-events-none" />
                <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#030014BB] h-1/2 max-h-44 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <ScanSearch className=" pointer-events-none text-white opacity-0 group-hover:opacity-100 transform transition-all duration-500 will-change-transform scale-50 m-auto w-10 h-10 group-hover:scale-100"/>
                </div>
                </div>
              </div>
          ))}
        </div>
        ) : (
          <p className="text-gray-400 opacity-50">No screenshots added.</p>
        )}
      </div>) : (null)
  );
}

const ToolStats = ({ tool }) => {
  const techStackCount = tool?.TechStack?.length || 0;
  const featuresCount = tool?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#0a111a33] rounded-xl overflow-hidden relative border border-blue-500/20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 opacity-50 blur-2xl z-0" />

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <UsersRound
            className="text-blue-300 w-4 h-4 md:w-6 md:h-6"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">
            {techStackCount}
          </div>
          <div className="text-[10px] md:text-xs text-gray-400">
            Total Downloads
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-blue-500/20 transition-all duration-300 hover:scale-105 hover:border-blue-500/50 hover:shadow-lg">
        <div className="bg-blue-500/20 p-1.5 md:p-2 rounded-full">
          <CalendarCheck2
            className="text-blue-300 w-4 h-4 md:w-6 md:h-6"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-blue-200">
            {featuresCount}
          </div>
          <div className="text-[10px] md:text-xs text-gray-400">
            Month Developed
          </div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Sorry, this project's source code is confidential.",
      confirmButtonText: "Fot it",
      confirmButtonColor: "#3085d6",
      background: "#030014",
      color: "#ffffff",
    });
    return false;
  }
  return true;
};

const ToolsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [modalOpened,setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [queuedImageUrl, setQueuedImageUrl] = useState(null);
  const [queuedModalOpened, setQueuedModalOpen] = useState(null);

  const ShowImageModal = (url)=>{
    setQueuedImageUrl(url);
  };

  useEffect(() => {
    if (queuedImageUrl) {
      setModalImageUrl(queuedImageUrl);
      setModalOpen(true);
      setQueuedImageUrl(null); // Clear the queued URL after processing
    }
  }, [queuedImageUrl]);
  useEffect(() => {
    console.log(queuedModalOpened);
    if(queuedModalOpened){
      alert(queuedModalOpened ? "Modal Will Be Opened" : "Modal Will Be Closed");
      setModalOpen(queuedModalOpened);
      setQueuedModalOpen(null);
    }
  }, [queuedModalOpened]);

  useEffect(()=>{
    window.scrollTo(0, 0);
    const fetchToolData = async ()=>{
      const docRef = doc(db, "tools", id);
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          const innerCollectionRef = collection(docSnap.ref, 'Contents');
          const innerCollectionSnapshot = await getDocs(innerCollectionRef);
          const innerCollectionData = innerCollectionSnapshot.docs.map((innerDoc) => ({
            id: innerDoc.id,
            Img: innerDoc.data().Img,
            Text: innerDoc.data().Texts,
            Title: innerDoc.data().Title,
          }));
          const enhancedTool = {
            ...docSnap.data(),
            Contents: innerCollectionData,
            Features: docSnap.data().Features || [],
            TechStack: docSnap.data().TechStack || [],
            Screenshots: docSnap.data().Screenshots || [],
            Github: docSnap.data().GithubRepo,
          };
          setTool(enhancedTool);
        } else {
          console.log("No such document!");
        }
    };
    fetchToolData();
  }, [id]);

  if (!tool) {
    return (
      <div className="min-h-screen bg-[#000714] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-8 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">
            Loading Tool...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000714] px-[2%] sm:px-0 relative overflow-hidden">
      <AnimatedBackground/>
      {/* Background animations remain unchanged */}
      <div className="fixed inset-0">
        <div className="absolute -inset-[10px] opacity-20">
          <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>
      <div className="relative">
        <div className="max-w-[100rem] mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </button>
            <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
              <span>Tool</span>
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
              <span className="text-white/90 truncate">{tool.Title}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 md:gap-16">
            <div className="space-y-6 col-span-2 md:space-y-10 animate-slideInLeft">
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl pb-3 md:text-6xl font-bold bg-gradient-to-r from-[#87abff] to-[#5279bf] bg-clip-text text-transparent leading-tight">
                  {tool.Title}
                </h1>
                <div className="relative h-1 w-32 md:w-24" style={{marginTop:"0px"}}>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1659f5] to-[#14ace3] rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1659f5] to-[#14ace3] rounded-full blur-sm" />
                </div>
              </div>

              <div className="relative rounded-2xl my-4 overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={tool.Img}
                  alt={tool.Title}
                  className="w-full  object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-105"
                  onLoad={() => setIsImageLoaded(true)}
                />
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
                <div className="absolute left-0 right-0 bottom-0 bg-gradient-to-t from-[#030014BB] h-1/2 max-h-44 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              

              <div className="prose prose-invert max-w-none" style={{marginTop:"0px"}}>
                <p className="indent-10 py-5 text-base md:text-lg text-gray-300/90 leading-relaxed">
                  {tool.Description}
                </p>
              </div>

              {tool.Contents.map((content, index)=>(
                <ContentItem key={index} content={content}/>
              ))}
              
              <ScreenshotGrid screenshots={tool.Screenshots} OnClicked={ShowImageModal}/>
            </div>

            <div className="space-y-6 md:space-y-10 animate-slideInRight">
              <div className="flex flex-wrap gap-3 md:gap-4">
                {/* Action buttons */}
                {
                  tool.StorePage === undefined ? (null) : (
                  <a
                    href={tool.StorePage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-[#1659f522] to-[#14ace311] hover:from-[#1659f522] hover:to-[#14ace311] text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-[#1659f522] to-[#14ace344] transition-transform duration-300 group-hover:translate-y-[0%]" />
                    <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium">Store Page</span>
                  </a>
                  )
                }
                {
                  tool.Github === undefined ? (null) : (
                  <a
                    href={tool.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-[#1659f522] to-[#14ace311] hover:from-[#1659f522] hover:to-[#14ace311] text-blue-300 rounded-xl transition-all duration-300 border border-blue-500/20 hover:border-blue-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
                    onClick={(e) =>
                      !handleGithubClick(tool.Github) && e.preventDefault()
                    }
                  >
                    <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-[#1659f522] to-[#14ace344] transition-transform duration-300 group-hover:translate-y-[0%]" />
                    <Github className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="relative font-medium">Github</span>
                  </a>
                  )
                }
              </div>
              <div className="relative rounded-2xl overflow-hidden">
                {/* Fitur Utama */}
                {
                  tool.Features.length > 0 ? (
                    <div className="bg-white/[0.02] mb-5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 space-y-6 hover:border-white/20 transition-colors duration-300 group">
                      <h3 className="text-xl font-semibold text-white/90 flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                        Key Features
                      </h3>
                      <ul className="list-none space-y-2">
                          {tool.Features.map((feature, index) => (
                            <FeatureItem key={index} feature={feature} />
                          ))}
                        </ul>
                    </div>
                  ) : (null)
                }
                
                <div className="mb-8">
                  <ToolStats tool={tool} />
                </div>
                {
                  tool.TechStack.length > 0 ? (
                  <div className="space-y-4 md:space-y-6">
                    <h3 className="text-lg md:text-xl font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                      <Code2 className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {tool.TechStack.map((tech, index) => (
                          <TechBadge key={index} tech={tech} />
                        ))}
                      </div>
                  </div>
                  ) : (null)
                }
                
              </div>
            </div>
          </div>
        </div>
        </div>
        
        <ImageModal Opened={modalOpened} ImgUrl={modalImageUrl} OnClose={()=>setModalOpen(false)}/>
      <style jsx="true">{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ToolsDetails;
