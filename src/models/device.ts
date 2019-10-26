export interface Device {
  device_id: string,
  protocol: string,
  firmware: string,
  device_type: string,
  activation_status: boolean,
  damaged_status: boolean,
  encryption_keys: string[],
  owner: string | number,
}
