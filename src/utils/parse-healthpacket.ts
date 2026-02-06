import { VehicleHealthPacketZodType } from "../validators/vehicles/index.js";


export const parseHealthPacket = (rawPacket: string): Omit<VehicleHealthPacketZodType, 'sln' > => {
  const parts = rawPacket.split('|');
  if (parts.length !== 10) {
    throw new Error(`Invalid health packet format: expected 10 parts, got ${parts.length}. Packet: ${rawPacket}`);
  }

  const [
    packet_type,     // HLM
    imei,            // 869742085794474
    unknown1,        // 26 (possibly battery_voltage or other metric)
    main_power_str,  // 1 (0=false, 1=true)
    unknown2,        // 3862 (possibly time_stamp_server related or other)
    connection_str,  // 0 (0=false, 1=true)
    latitude,        // 22.511563
    longitude,       // 88.399170
    epoch_time,      // last one as number
    unknown3         // 0 (possibly reserved for future use or other metric)
  ] = parts;

  return {
    packet_type: packet_type as "HLM", // assuming HLM -> HLM mapping
    imei,
    packet: rawPacket,
    connecttion: connection_str === '1',
    battery_voltage: BigInt(unknown1), // mapping unknown1 to battery_voltage
    main_power: main_power_str === '1',
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    epoch_time: parseInt(epoch_time, 10),
    time_stamp_server: new Date(), // set server timestamp to now
  };
};