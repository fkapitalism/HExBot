class Host {
  constructor(ip=null, softwares=[], internet=null, freehd=null, ips=[]) {
    this.ip = ip;
    this.softwares = softwares;
    this.internet = internet;
    this.freehd = freehd;
    this.ips = ips;
    this.timestamp = new Date().getTime();
  }
  setIps(ips) {
  	this.ips = ips
  }
}