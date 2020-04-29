import Caver from 'caver-js';


class CaverHandler {
  caver : Caver;

  constructor () {
    this.caver = new Caver(process.env.KLAYTN_EN);
  }

  async getAccount (_address, _defaultblock) {
    console.log(_address);

    const info = await this.caver.klay.getAccount(
      _address,
      _defaultblock || this.caver.klay.defaultBlock
    )

    console.log("ADDR_INFO::: ", info);



    return info;
  }

  createAccount (_entropy="") {
    const acct = this.caver.klay.accounts.create(_entropy);
    return acct;
  }

  async getNetInfo () {
    /*
    [ 'currentProvider',
      '_requestManager',
      'providers',
      '_provider',
      'setProvider',
      'setRequestManager',
      'BatchRequest',
      'getId',
      'isListening',
      'getPeerCount',
      'peerCountByType',
      'getNetworkType' ]
    */

    console.log("INFO: ", this.caver.klay.net.providers)

    let rewardBase= "";
    let isCN = false;

    try {
      rewardBase = await this.caver.klay.rewardbase();
      isCN = true;

    } catch(err) {
      console.log("Handled Error: ", err);

    }

    const activeModules : string[] = Object.keys(this.caver).map(d=>String(d));
    const url = process.env.KLAYTN_EN;
    const netID = await this.caver.klay.net.getId();
    const isListening = await this.caver.klay.net.isListening();
    const peerTypes = await this.caver.klay.net.peerCountByType();
    const nodeInfo = await this.caver.klay.getNodeInfo();
    const networkType = await this.caver.klay.net.getNetworkType();

    //const rewardBase = await this.caver.klay.rewardbase();
    const protocolVersion = await this.caver.klay.getProtocolVersion();


    return {
      node_url: url,
      network_id: netID,
      is_listening: isListening,
      peer_info: peerTypes,
      rewardbase: rewardBase,
      is_consensus_node: isCN,
      protocol_version: protocolVersion,
      node_info: nodeInfo,
      net_type: networkType,
      active_modules: activeModules
    }

  }
}

export { CaverHandler };