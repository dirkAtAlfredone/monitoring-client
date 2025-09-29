export interface IHost {
  id?: string,
  name: string,
  ip: string,
  description?: string,
  status?: HostStatus
}

export enum HostStatus {
  live = "live",
  unreachable = "unreachable",
  pinging = "pinging"
}