export const fetchRealtimeData = async () => {
  try {
    const res = await fetch("http://localhost:5000/energy/realtime");
    return await res.json();
  } catch (err) {
    console.error("Error fetching energy data:", err);
    return [];
  }
};
