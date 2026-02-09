import { VehicleHealthPacketZodType } from "../validators/vehicles/index.js";

export const parseHealthPacket = (
  rawPacket: string,
): Omit<VehicleHealthPacketZodType, "sln"> => {
  const parts = rawPacket.split("|");
  if (parts.length !== 10) {
    throw new Error(
      `Invalid health packet format: expected 10 parts, got ${parts.length}. Packet: ${rawPacket}`,
    );
  }

  const [
    packet_type, // HLM
    imei, // 869742085794474
    battery_voltage, // 26 (possibly battery_voltage or other metric)
    main_power_str, // 1 (0=false, 1=true)
    unknown2, // 3862 (possibly time_stamp_server related or other)
    connection_str, // 0 (0=false, 1=true)
    latitude, // 22.511563
    longitude, // 88.399170
    epoch_time, // last one as number
    unknown3, // 0 (possibly reserved for future use or other metric)
  ] = parts;

  return {
    packet_type: packet_type as "HLM", // assuming HLM -> HLM mapping
    imei,
    packet: rawPacket,
    connection: connection_str === "1",
    battery_voltage: BigInt(battery_voltage), // mapping battery_voltage to BigInt
    main_power: main_power_str === "1",
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    epoch_time: parseInt(epoch_time, 10),
    time_stamp_server: new Date(), // set server timestamp to now
  };
};

export const generateHealthPacket = (imei: string): string => {
  const packet_type = "HLM";
  const battery_voltage = Math.floor(Math.random() * 30 + 20).toString(); // 20-50V
  const main_power_str = Math.random() > 0.5 ? "1" : "0";
  const unknown2 = Math.floor(Math.random() * 5000).toString();
  const connection_str = Math.random() > 0.3 ? "1" : "0";
  const latitude = (22.5 + Math.random() * 0.1).toFixed(6); // ~22.5°N with variation
  const longitude = (88.4 + Math.random() * 0.1).toFixed(6); // ~88.4°E with variation
  const epoch_time = Math.floor(Date.now() / 1000).toString();
  const unknown3 = "";

  return [
    packet_type,
    imei,
    battery_voltage,
    main_power_str,
    unknown2,
    connection_str,
    latitude,
    longitude,
    epoch_time,
    unknown3,
  ].join("|");
};
