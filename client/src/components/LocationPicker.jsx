import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

function LocationMarker({
    position,
    setPosition,
    setAddress
}) {

    useMapEvents({

        async click(e) {

            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            setPosition([lat, lng]);

            try {

                const res = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );

                const data = await res.json();

                setAddress(data.display_name);

            } catch (err) {

                console.log(err);

            }

        }

    });

    return position ? <Marker position={position} /> : null;

}

function LocationPicker({

    position,
    setPosition,
    address,
    setAddress

}) {

    return (

        <div style={{ marginBottom: "30px" }}>

            <h4>Delivery Address</h4>

            <MapContainer

                center={[-7.9826,112.6304]}
                zoom={13}

                style={{
                    height: "350px",
                    width: "100%",
                    borderRadius: "15px"
                }}

            >

                <TileLayer
                    attribution='&copy; OpenStreetMap'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <LocationMarker
                    position={position}
                    setPosition={setPosition}
                    setAddress={setAddress}
                />

            </MapContainer>

            <textarea

                className="form-control mt-3"

                rows="3"

                value={address}

                readOnly

            />

        </div>

    );

}

export default LocationPicker;