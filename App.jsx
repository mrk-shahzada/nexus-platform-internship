import React, { useState, useRef } from 'react';
import { 
  Calendar as CalendarIcon, Video, Wallet, 
  Menu, Camera, Mic, ScreenShare, CheckCircle 
} from 'lucide-react';

// Library Imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import SignatureCanvas from 'react-signature-canvas';

// --- SCHEDULING ---
const SchedulingModule = () => {
  const [events, setEvents] = useState([{ title: 'Investor Sync', date: '2026-05-20' }]);
  const handleDateClick = (arg) => {
    const title = prompt("Enter Meeting Title:");
    if (title) setEvents([...events, { title, date: arg.dateStr }]);
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-indigo-900">Meeting Calendar</h2>
      <FullCalendar plugins={[dayGridPlugin, interactionPlugin]} initialView="dayGridMonth" events={events} dateClick={handleDateClick} height="500px" />
    </div>
  );
};

// --- VIDEO & DOCS ---
const VideoCallModule = () => {
  const videoRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);
  const toggleCall = async () => {
    if (!isCalling) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsCalling(true);
    } else {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      setIsCalling(false);
    }
  };
  return (
    <div className="bg-slate-900 rounded-2xl aspect-video relative flex items-center justify-center border-4 border-indigo-500/20 overflow-hidden">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
      <div className="absolute bottom-6 flex gap-4">
        <button onClick={toggleCall} className={`p-4 rounded-full ${isCalling ? 'bg-red-500' : 'bg-indigo-600'} text-white shadow-lg`}><Camera /></button>
        <button className="p-4 bg-gray-700 text-white rounded-full"><Mic /></button>
      </div>
    </div>
  );
};

const DocumentChamber = () => {
  const sigPad = useRef({});
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 mt-6">
      <h3 className="font-bold mb-4">E-Signature Pad</h3>
      <SignatureCanvas ref={sigPad} penColor='black' canvasProps={{className: "sigCanvas border w-full h-40 rounded bg-gray-50"}} />
      <button onClick={() => alert("Document Signed!")} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg w-full font-bold">Sign Document</button>
    </div>
  );
};

// --- PAYMENTS ---
const PaymentsModule = () => (
  <div className="space-y-6 text-left">
    <div className="bg-indigo-700 p-8 rounded-2xl text-white shadow-xl">
      <p className="opacity-70 text-sm">Available Balance</p>
      <h2 className="text-4xl font-bold">$45,250.00</h2>
    </div>
  </div>
);

// --- MAIN APP ---
export default function NexusPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-900">
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r transition-all p-6 flex flex-col shadow-sm`}>
        <div className="font-black text-xl text-indigo-600 mb-10 italic">NEXUS</div>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('scheduling')} className={`w-full flex gap-3 p-3 rounded-lg font-medium transition ${activeTab==='scheduling' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500'}`}><CalendarIcon size={20}/> {sidebarOpen && "Scheduling"}</button>
          <button onClick={() => setActiveTab('video')} className={`w-full flex gap-3 p-3 rounded-lg font-medium transition ${activeTab==='video' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500'}`}><Video size={20}/> {sidebarOpen && "Call & Docs"}</button>
          <button onClick={() => setActiveTab('payments')} className={`w-full flex gap-3 p-3 rounded-lg font-medium transition ${activeTab==='payments' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-500'}`}><Wallet size={20}/> {sidebarOpen && "Payments"}</button>
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b px-8 flex items-center justify-between shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-indigo-600 transition"><Menu /></button>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block"><p className="text-sm font-bold">John Entrepreneur</p></div>
             <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">JE</div>
          </div>
        </header>

        <main className="p-8 max-w-5xl mx-auto w-full">
          {activeTab === 'scheduling' && <SchedulingModule />}
          {activeTab === 'video' && <div><VideoCallModule /><DocumentChamber /></div>}
          {activeTab === 'payments' && <PaymentsModule />}
          {activeTab === 'dashboard' && <div className="text-center py-20"><h1 className="text-4xl font-black text-indigo-900">Welcome to Nexus</h1><p className="text-gray-500 mt-2 text-lg">Your investor collaboration hub is ready.</p></div>}
        </main>
      </div>
    </div>
  );
}