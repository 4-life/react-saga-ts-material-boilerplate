export interface Device {
  // general information
  device_id: string,
  protocol: string,
  firmware: string,
  device_type: string,
  activation_status: boolean,
  damaged_status: boolean,
  encryption_keys: string[],
  owner: string | number,

  // business information
  last_update_time: string,
  last_firmware_update_time: string,
  production_batch_id: number,
  assembling_time: string,
  purchase_time: string,
  warranty_expiration_time: string,
  last_disabling_time: string,
  last_disabling_reason: string,
}
