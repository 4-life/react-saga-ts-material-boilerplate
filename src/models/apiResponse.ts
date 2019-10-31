export interface ApiResponse<Data> {
  reason: ReasonEnum;
  message: string;
  data?: Data;
}

export type ReasonEnum = 'not_found' | 'server_error' | 'invalid_field' | 'created' | 'no_data' | 'not_implemented' | 'ok' | 'restricted';
export const ReasonEnum = {
  NotFound: 'not_found' as ReasonEnum,
  ServerError: 'server_error' as ReasonEnum,
  InvalidField: 'invalid_field' as ReasonEnum,
  Created: 'created' as ReasonEnum,
  NoData: 'no_data' as ReasonEnum,
  NotImplemented: 'not_implemented' as ReasonEnum,
  Ok: 'ok' as ReasonEnum,
  Restricted: 'restricted' as ReasonEnum,
};
