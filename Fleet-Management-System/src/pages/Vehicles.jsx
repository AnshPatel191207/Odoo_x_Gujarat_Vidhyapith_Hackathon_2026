import { useState } from "react";
import Layout from "../components/layout/Layout";
import VehicleTable from "../components/vehicles/VehicleTable";
import AddVehicleModal from "../components/vehicles/AddVehicleModal";
import { useFleet } from "../context/FleetContext";

export default function Vehicles() {
  const { searchQuery, setSearchQuery } = useFleet();
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState("All");

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h2 className="page-title">Vehicle Fleet</h2>
          <p className="page-subtitle">Manage and monitor all fleet vehicles</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
          ➕ Add Vehicle
        </button>
      </div>

      <div className="toolbar">
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="Search by plate, make, model..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          {["All", "Active", "In Service", "Inactive"].map(f => (
            <button key={f} className={`filter-tab${filter === f ? " active" : ""}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <VehicleTable search={searchQuery} filter={filter} />

      {showAdd && <AddVehicleModal onClose={() => setShowAdd(false)} />}
    </Layout>
  );
}