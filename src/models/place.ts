export interface Place { 
  /**
   * Place Primary Key
   */
  id?: number;
  level?: number;
  lat: number;
  lon: number;
  creation_date?: Date;
  /**
   * Group Primary Key
   */
  group_id: number;
  group_inner_id: number;
  custom_id?: string;
  network_id?: string;
}
