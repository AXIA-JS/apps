"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specLogos = exports.nodeLogos = exports.namedLogos = exports.externalLogos = exports.extensionLogos = exports.emptyLogos = exports.chainLogos = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _util = require("../util.cjs");

var _aleph = _interopRequireDefault(require("./chains/aleph.svg"));

var _altair = _interopRequireDefault(require("./chains/altair.svg"));

var _crownSterling = _interopRequireDefault(require("./chains/crown-sterling.png"));

var _dusty = _interopRequireDefault(require("./chains/dusty.png"));

var _equilibrium = _interopRequireDefault(require("./chains/equilibrium.svg"));

var _genshiro = _interopRequireDefault(require("./chains/genshiro.svg"));

var _heiko = _interopRequireDefault(require("./chains/heiko.svg"));

var _hydrate = _interopRequireDefault(require("./chains/hydrate.png"));

var _interbtc = _interopRequireDefault(require("./chains/interbtc.png"));

var _karura = _interopRequireDefault(require("./chains/karura.svg"));

var _kintsugi = _interopRequireDefault(require("./chains/kintsugi.png"));

var _axialunar = _interopRequireDefault(require("./chains/axialunar-128.gif"));

var _picasso = _interopRequireDefault(require("./chains/picasso.svg"));

var _betanet = _interopRequireDefault(require("./chains/betanet.svg"));

var _betanetTick = _interopRequireDefault(require("./chains/betanet-tick.svg"));

var _betanetTrack = _interopRequireDefault(require("./chains/betanet-track.svg"));

var _betanetTrick = _interopRequireDefault(require("./chains/betanet-trick.svg"));

var _shiden = _interopRequireDefault(require("./chains/shiden.png"));

var _snakenet = _interopRequireDefault(require("./chains/snakenet.svg"));

var _spanner = _interopRequireDefault(require("./chains/spanner.png"));

var _standard = _interopRequireDefault(require("./chains/standard.png"));

var _unique = _interopRequireDefault(require("./chains/unique.svg"));

var _unorthodox = _interopRequireDefault(require("./chains/unorthodox.png"));

var _axiaJs = _interopRequireDefault(require("./extensions/axia-js.svg"));

var _commonwealth = _interopRequireDefault(require("./external/commonwealth.png"));

var _dotreasury = _interopRequireDefault(require("./external/dotreasury.svg"));

var _dotscanner = _interopRequireDefault(require("./external/dotscanner.png"));

var _polkascan = _interopRequireDefault(require("./external/polkascan.png"));

var _polkassembly = _interopRequireDefault(require("./external/polkassembly.png"));

var _polkastats = _interopRequireDefault(require("./external/polkastats.png"));

var _statescan = _interopRequireDefault(require("./external/statescan.svg"));

var _subid = _interopRequireDefault(require("./external/subid.svg"));

var _subscan = _interopRequireDefault(require("./external/subscan.svg"));

var _acalaCircle = _interopRequireDefault(require("./nodes/acala-circle.svg"));

var _apron = _interopRequireDefault(require("./nodes/apron.png"));

var _ares = _interopRequireDefault(require("./nodes/ares.svg"));

var _basilisk = _interopRequireDefault(require("./nodes/basilisk.png"));

var _beast = _interopRequireDefault(require("./nodes/beast.svg"));

var _bifrost = _interopRequireDefault(require("./nodes/bifrost.svg"));

var _bitcountry = _interopRequireDefault(require("./nodes/bitcountry.svg"));

var _calamari = _interopRequireDefault(require("./nodes/calamari.png"));

var _canvas = _interopRequireDefault(require("./nodes/canvas-2.png"));

var _centrifuge = _interopRequireDefault(require("./nodes/centrifuge.png"));

var _chainx = _interopRequireDefault(require("./nodes/chainx.svg"));

var _clover = _interopRequireDefault(require("./nodes/clover.svg"));

var _crab = _interopRequireDefault(require("./nodes/crab.svg"));

var _crownSterling2 = _interopRequireDefault(require("./nodes/crown-sterling.png"));

var _crust = _interopRequireDefault(require("./nodes/crust.svg"));

var _crustMaxwell = _interopRequireDefault(require("./nodes/crust-maxwell.svg"));

var _darwinia = _interopRequireDefault(require("./nodes/darwinia.png"));

var _datahighway = _interopRequireDefault(require("./nodes/datahighway.png"));

var _dockMainnet = _interopRequireDefault(require("./nodes/dock-mainnet.png"));

var _dockTestnet = _interopRequireDefault(require("./nodes/dock-testnet.png"));

var _dotmog = _interopRequireDefault(require("./nodes/dotmog.svg"));

var _eave = _interopRequireDefault(require("./nodes/eave.svg"));

var _edgewareCircle = _interopRequireDefault(require("./nodes/edgeware-circle.svg"));

var _encointerNotee = _interopRequireDefault(require("./nodes/encointer-notee.svg"));

var _encointerTeeproxy = _interopRequireDefault(require("./nodes/encointer-teeproxy.svg"));

var _fantour = _interopRequireDefault(require("./nodes/fantour.png"));

var _galitalLogo = _interopRequireDefault(require("./nodes/galital-logo.png"));

var _gamepower = _interopRequireDefault(require("./nodes/gamepower.svg"));

var _geek = _interopRequireDefault(require("./nodes/geek.svg"));

var _hanonycash = _interopRequireDefault(require("./nodes/hanonycash.svg"));

var _heiko2 = _interopRequireDefault(require("./nodes/heiko.svg"));

var _idavoll = _interopRequireDefault(require("./nodes/idavoll.png"));

var _integritee = _interopRequireDefault(require("./nodes/integritee.svg"));

var _interbtc2 = _interopRequireDefault(require("./nodes/interbtc.png"));

var _ipse = _interopRequireDefault(require("./nodes/ipse.png"));

var _jupiter = _interopRequireDefault(require("./nodes/jupiter.svg"));

var _khala = _interopRequireDefault(require("./nodes/khala.svg"));

var _kilt = _interopRequireDefault(require("./nodes/kilt.png"));

var _klug = _interopRequireDefault(require("./nodes/klug.png"));

var _konomi = _interopRequireDefault(require("./nodes/konomi.png"));

var _kulupu = _interopRequireDefault(require("./nodes/kulupu.svg"));

var _kylin = _interopRequireDefault(require("./nodes/kylin.png"));

var _laminarCircle = _interopRequireDefault(require("./nodes/laminar-circle.svg"));

var _litentry = _interopRequireDefault(require("./nodes/litentry.png"));

var _loom_network = _interopRequireDefault(require("./nodes/loom_network.png"));

var _manta = _interopRequireDefault(require("./nodes/manta.png"));

var _math = _interopRequireDefault(require("./nodes/math.svg"));

var _moonbeam = _interopRequireDefault(require("./nodes/moonbeam.png"));

var _moonriver = _interopRequireDefault(require("./nodes/moonriver.svg"));

var _moonrock = _interopRequireDefault(require("./nodes/moonrock.png"));

var _moonshadow = _interopRequireDefault(require("./nodes/moonshadow.png"));

var _mybank = _interopRequireDefault(require("./nodes/mybank.png"));

var _nftmart = _interopRequireDefault(require("./nodes/nftmart.png"));

var _nodle = _interopRequireDefault(require("./nodes/nodle.svg"));

var _oakTestnet = _interopRequireDefault(require("./nodes/oak-testnet.png"));

var _opportunity = _interopRequireDefault(require("./nodes/opportunity.png"));

var _origintrail = _interopRequireDefault(require("./nodes/origintrail.png"));

var _pangolin = _interopRequireDefault(require("./nodes/pangolin.svg"));

var _pangoro = _interopRequireDefault(require("./nodes/pangoro.svg"));

var _parami = _interopRequireDefault(require("./nodes/parami.png"));

var _phala = _interopRequireDefault(require("./nodes/phala.svg"));

var _phoenix = _interopRequireDefault(require("./nodes/phoenix.png"));

var _plasm = _interopRequireDefault(require("./nodes/plasm.png"));

var _polkadex = _interopRequireDefault(require("./nodes/polkadex.svg"));

var _axiaCircle = _interopRequireDefault(require("./nodes/axia-circle.svg"));

var _axiaJs2 = _interopRequireDefault(require("./nodes/axia-js.svg"));

var _polkafoundry = _interopRequireDefault(require("./nodes/polkafoundry.svg"));

var _polkasmith = _interopRequireDefault(require("./nodes/polkasmith.svg"));

var _polymesh = _interopRequireDefault(require("./nodes/polymesh.svg"));

var _pontem = _interopRequireDefault(require("./nodes/pontem.svg"));

var _prism = _interopRequireDefault(require("./nodes/prism.png"));

var _realis = _interopRequireDefault(require("./nodes/realis.png"));

var _riochain = _interopRequireDefault(require("./nodes/riochain.svg"));

var _robonomics = _interopRequireDefault(require("./nodes/robonomics.svg"));

var _sakura = _interopRequireDefault(require("./nodes/sakura.svg"));

var _shadow = _interopRequireDefault(require("./nodes/shadow.svg"));

var _shell = _interopRequireDefault(require("./nodes/shell.svg"));

var _singlavender = _interopRequireDefault(require("./nodes/singlavender.svg"));

var _soraSubstrate = _interopRequireDefault(require("./nodes/sora-substrate.svg"));

var _stafi = _interopRequireDefault(require("./nodes/stafi.png"));

var _statemine = _interopRequireDefault(require("./nodes/statemine.svg"));

var _subdao = _interopRequireDefault(require("./nodes/subdao.png"));

var _subgame = _interopRequireDefault(require("./nodes/subgame.svg"));

var _subsocial = _interopRequireDefault(require("./nodes/subsocial.svg"));

var _subspace = _interopRequireDefault(require("./nodes/subspace.png"));

var _substrateContractsNode = _interopRequireDefault(require("./nodes/substrate-contracts-node.png"));

var _substrateHexagon = _interopRequireDefault(require("./nodes/substrate-hexagon.svg"));

var _ternoa = _interopRequireDefault(require("./nodes/ternoa.svg"));

var _trustbase = _interopRequireDefault(require("./nodes/trustbase.png"));

var _uniarts = _interopRequireDefault(require("./nodes/uniarts.png"));

var _unique2 = _interopRequireDefault(require("./nodes/unique.svg"));

var _unitv = _interopRequireDefault(require("./nodes/unitv.png"));

var _valiu = _interopRequireDefault(require("./nodes/valiu.png"));

var _web3games = _interopRequireDefault(require("./nodes/web3games.svg"));

var _alphanet_colour = _interopRequireDefault(require("./nodes/alphanet_colour.svg"));

var _westlake = _interopRequireDefault(require("./nodes/westlake.png"));

var _whala = _interopRequireDefault(require("./nodes/whala.svg"));

var _zCloak = _interopRequireDefault(require("./nodes/zCloak.svg"));

var _zeitgeist = _interopRequireDefault(require("./nodes/zeitgeist.png"));

var _zenlink = _interopRequireDefault(require("./nodes/zenlink.svg"));

var _zero = _interopRequireDefault(require("./nodes/zero.svg"));

var _empty = _interopRequireDefault(require("./empty.svg"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// last-resort fallback, just something empty
// Alphabetical overrides based on the actual matched chain name
// NOTE: This is as retrieved via system.chain RPC
const chainLogos = Object.entries({
  'Aleph Zero Testnet': _aleph.default,
  Altair: _altair.default,
  'Apron PC1': _apron.default,
  'Ares PC1': _ares.default,
  'Beast Developer': _beast.default,
  Bifrost: _bifrost.default,
  'Bifrost Asgard CC4': _bifrost.default,
  Calamari: _calamari.default,
  ChainX: _chainx.default,
  'Charcoal Testnet': _centrifuge.default,
  'Crown Sterling': _crownSterling.default,
  'Crust Maxwell': _crustMaxwell.default,
  'Crust PC1': _crust.default,
  'darwinia crab': _crab.default,
  'Darwinia Crab PC2': _crab.default,
  'Darwinia PC2': _darwinia.default,
  DataHighway: _datahighway.default,
  Dusty: _dusty.default,
  'Encointer Canary': _encointerNotee.default,
  'Encointer PC1': _encointerNotee.default,
  Equilibrium: _equilibrium.default,
  EquilibriumTestnet: _equilibrium.default,
  Galital: _galitalLogo.default,
  Galois: _math.default,
  'GamePower Network': _gamepower.default,
  GEEK: _geek.default,
  Genshiro: _genshiro.default,
  'Genshiro BetaNet Testnet': _equilibrium.default,
  'HydraDX Hydrate': _hydrate.default,
  'HydraDX Snakenet': _snakenet.default,
  'HydraDX Snakenet Gen2': _snakenet.default,
  'HydraDX Snakenet Gen3': _snakenet.default,
  Idavoll: _idavoll.default,
  InterBTC: _interbtc2.default,
  'InterBTC Staging': _interbtc2.default,
  IpseTestnet: _ipse.default,
  'Jupiter A1': _jupiter.default,
  'Jupiter PC1': _jupiter.default,
  Karura: _karura.default,
  KILT: _kilt.default,
  'KILT Local': _kilt.default,
  'KILT Peregrine': _kilt.default,
  'KILT Testnet': _kilt.default,
  Kintsugi: _kintsugi.default,
  KlugDossier: _klug.default,
  Konomi: _konomi.default,
  Kpron: _apron.default,
  AXIALunar: _axialunar.default,
  // new name after CC3
  'AXIALunar CC1': _axialunar.default,
  'AXIALunar CC2': _axialunar.default,
  'AXIALunar CC3': _axialunar.default,
  'Kylin Testnet': _kylin.default,
  Litentry: _litentry.default,
  'Loom Network Local': _loom_network.default,
  LoomNetwork: _loom_network.default,
  'Manta Testnet': _manta.default,
  Mars: _ares.default,
  'MathChain PC1': _math.default,
  'Moonbase Alpha': _moonbeam.default,
  'Moonbase Development Testnet': _moonbeam.default,
  'Moonbase Stage': _moonbeam.default,
  Moonriver: _moonriver.default,
  Moonrock: _moonrock.default,
  Moonshadow: _moonshadow.default,
  'mybank.network PC1': _mybank.default,
  'NFTMart Staging': _nftmart.default,
  'NFTMart Testnet': _nftmart.default,
  'OAK Testnet': _oakTestnet.default,
  'OriginTrail Allychain': _origintrail.default,
  'OriginTrail Allychain Testnet': _origintrail.default,
  Pangolin: _pangolin.default,
  Pangoro: _pangoro.default,
  'Parallel Heiko': _heiko.default,
  'Parami PC2': _parami.default,
  'Phala PC1': _phala.default,
  'PHOENIX PC1': _phoenix.default,
  'Polkadex Testnet': _polkadex.default,
  'PolkaFoundry PC1': _polkafoundry.default,
  'Pontem Testnet': _pontem.default,
  'Prism PC1': _prism.default,
  'Prism Testnet': _prism.default,
  'ReAlis Network': _realis.default,
  'RioChain CC-1': _riochain.default,
  'RioChain Staging': _riochain.default,
  BetaNet: _betanet.default,
  Shiden: _shiden.default,
  SingLavender: _singlavender.default,
  Spanner: _spanner.default,
  'Spartan Testnet': _subspace.default,
  Standard: _standard.default,
  Statemine: _statemine.default,
  'Statemine Test': _statemine.default,
  Statemint: _statemine.default,
  'Statemint Test': _statemine.default,
  'Steam PC': _eave.default,
  'SubDAO PC1': _subdao.default,
  subgame: _subgame.default,
  'SubGame Gamma': _subgame.default,
  'SubGame Staging': _subgame.default,
  Subsocial: _subsocial.default,
  'Subsocial PC': _subsocial.default,
  Tick: _betanetTick.default,
  Track: _betanetTrack.default,
  Trick: _betanetTrick.default,
  trustbase: _trustbase.default,
  'TrustBase PC1': _trustbase.default,
  'uni arts staging network': _uniarts.default,
  'UniArts Mainnet': _uniarts.default,
  Unique: _unique.default,
  'Unit Network': _unitv.default,
  Unorthodox: _unorthodox.default,
  Vln: _valiu.default,
  'VLN PC': _valiu.default,
  Web3games: _web3games.default,
  AlphaNet: _alphanet_colour.default,
  Westlake: _westlake.default,
  Westmint: _statemine.default,
  'Westmint Test': _statemine.default,
  WILT: _kilt.default,
  'zcloak poc1': _zCloak.default
}).reduce((logos, _ref) => {
  let [chain, logo] = _ref;
  return _objectSpread(_objectSpread({}, logos), {}, {
    [(0, _util.sanitize)(chain)]: logo
  });
}, {}); // Alphabetical overrides based on the actual software node type
// NOTE: This is as retrieved via system.name RPC

exports.chainLogos = chainLogos;
const nodeLogos = Object.entries({
  'Acala Node': _acalaCircle.default,
  'Apron Node': _apron.default,
  'Apron Allychain Collator': _apron.default,
  'Ares Node': _ares.default,
  'Ares Allychain Collator': _ares.default,
  Basilisk: _basilisk.default,
  'Beast Node': _beast.default,
  Bifrost: _bifrost.default,
  'Bifrost Node': _bifrost.default,
  'Bit Country Tewai Allychain Collator': _bitcountry.default,
  'Bit.Country': _bitcountry.default,
  'BitCountry Node': _bitcountry.default,
  'Calamari Allychain Collator': _calamari.default,
  'Canvas Node': _canvas.default,
  'centrifuge chain': _centrifuge.default,
  'Centrifuge Chain Node': _centrifuge.default,
  'ChainX Node': _chainx.default,
  'Clover Node': _clover.default,
  'Crown Sterling': _crownSterling2.default,
  crust: _crust.default,
  'Crust Collator': _crust.default,
  'Crust Maxwell': _crustMaxwell.default,
  darwinia: _darwinia.default,
  'darwinia crab': _crab.default,
  'darwinia allychain': _darwinia.default,
  'Darwinia Runtime Module Library': _darwinia.default,
  DataHighway: _datahighway.default,
  'DataHighway Node': _datahighway.default,
  'DataHighway Allychain Collator': _datahighway.default,
  'Dock Full Node': _dockMainnet.default,
  'DOTMog Node': _dotmog.default,
  'Eave Node': _eave.default,
  'Edgeware Node': _edgewareCircle.default,
  'Encointer Node': _encointerNotee.default,
  'Encointer Node noTEE': _encointerNotee.default,
  'Encointer Node TEE proxy': _encointerTeeproxy.default,
  'Fantour Node': _fantour.default,
  'Galital Allychain Collator': _galitalLogo.default,
  Galois: _math.default,
  'GamePower Node': _gamepower.default,
  GEEK: _geek.default,
  'Halongbay Allychain Collator': _polkafoundry.default,
  hanonycash: _hanonycash.default,
  'Idavoll Node': _idavoll.default,
  'Integritee Collator': _integritee.default,
  IpseTestnet: _ipse.default,
  Khala: _khala.default,
  'Khala Node': _khala.default,
  KILT: _kilt.default,
  'KILT Local': _kilt.default,
  'KILT Peregrine': _kilt.default,
  Kintsugi: _kintsugi.default,
  'Klug Dossier Node': _klug.default,
  'Kpron Collator': _apron.default,
  kulupu: _kulupu.default,
  'Kylin Node': _kylin.default,
  'Laminar Node': _laminarCircle.default,
  Litentry: _litentry.default,
  'Litentry Collator': _litentry.default,
  'mandala node': _acalaCircle.default,
  'Manta Node': _manta.default,
  'Manta Allychain Collator': _manta.default,
  Moonrock: _moonrock.default,
  'mybank.network': _mybank.default,
  'NFTMart Staging': _nftmart.default,
  'NFTMart Testnet': _nftmart.default,
  'node-template': _substrateHexagon.default,
  'Nodle Chain Node': _nodle.default,
  'OAK Testnet': _oakTestnet.default,
  'Opportunity Standalone Testnet': _opportunity.default,
  'OriginTrail Allychain': _origintrail.default,
  'OriginTrail Allychain Testnet': _origintrail.default,
  Pangolin: _pangolin.default,
  Pangoro: _pangoro.default,
  'Parallel Heiko': _heiko2.default,
  Parami: _parami.default,
  'axia-axia': _axiaCircle.default,
  'Patract Node': _jupiter.default,
  'Phala Collator': _phala.default,
  'phala-substrate-node': _phala.default,
  'PHOENIX Collator': _phoenix.default,
  'PHOENIX Node': _phoenix.default,
  Plasm: _plasm.default,
  'Plasm Node': _plasm.default,
  'Plasm Allychain Collator': _plasm.default,
  'Polkadex Node': _polkadex.default,
  'axia-js': _axiaJs2.default,
  'PolkaFoundry Node': _polkafoundry.default,
  'PolkaFoundry Allychain Collator': _polkafoundry.default,
  'PolkaSmith Allychain Collator': _polkasmith.default,
  'Pontem Testnet': _pontem.default,
  'Prism Collator': _prism.default,
  'Prism Node': _prism.default,
  'ReAlis Network': _realis.default,
  'Rio Defi Chain Node': _riochain.default,
  'RioChain Staging': _riochain.default,
  robonomics: _robonomics.default,
  Sakura: _sakura.default,
  Shadow: _shadow.default,
  sherpax: _chainx.default,
  'Shiden Collator': _shiden.default,
  'SingLavender Allychain Collator': _singlavender.default,
  SORA: _soraSubstrate.default,
  'Spartan Testnet': _subspace.default,
  Stafi: _stafi.default,
  'Stafi Node': _stafi.default,
  'Statemine Collator': _statemine.default,
  'Statemint Collator': _statemine.default,
  'SubDAO Collator': _subdao.default,
  subgame: _subgame.default,
  'SubGame Gamma': _subgame.default,
  'SubGame Staging': _subgame.default,
  'Subsocial Node': _subsocial.default,
  'Subsocial PC': _subsocial.default,
  'subsocial-node': _subsocial.default,
  'substrate-contracts-node': _substrateContractsNode.default,
  'substrate-node': _substrateHexagon.default,
  'subzero node': _zero.default,
  'Ternoa Node': _ternoa.default,
  'TrustBase Collator': _trustbase.default,
  'TrustBase Node': _trustbase.default,
  'uni arts node': _uniarts.default,
  'UniArts Node': _uniarts.default,
  'Unique Node': _unique2.default,
  'Unit Collator': _unitv.default,
  'Unit Node': _unitv.default,
  Vln: _valiu.default,
  'VLN PC': _valiu.default,
  Web3games: _web3games.default,
  AlphaNet: _alphanet_colour.default,
  Westlake: _westlake.default,
  'Westmint Collator': _statemine.default,
  Whala: _whala.default,
  'Whala Node': _whala.default,
  WILT: _kilt.default,
  'zcloak node': _zCloak.default,
  'Zeitgeist Collator': _zeitgeist.default,
  'Zeitgeist Node': _zeitgeist.default,
  Zenlink: _zenlink.default,
  'Zenlink Collator': _zenlink.default
}).reduce((logos, _ref2) => {
  let [node, logo] = _ref2;
  return _objectSpread(_objectSpread({}, logos), {}, {
    [(0, _util.sanitize)(node)]: logo
  });
}, {}); // Alphabetical overrides based on the actual specName

exports.nodeLogos = nodeLogos;
const specLogos = Object.entries({
  shell: _shell.default,
  statemine: _statemine.default,
  statemint: _statemine.default,
  westmint: _statemine.default
}).reduce((logos, _ref3) => {
  let [spec, logo] = _ref3;
  return _objectSpread(_objectSpread({}, logos), {}, {
    [(0, _util.sanitize)(spec)]: logo
  });
}, {}); // Alphabetical overrides when we pass an explicit logo name
// NOTE: Matches with what is defined as "info" in settings/endpoints.ts
// (Generally would be the 'network' key in the known ss58 as per
// https://github.com/axia-js/common/blob/master/packages/networks/src/index.ts)

exports.specLogos = specLogos;
const namedLogos = {
  acala: _acalaCircle.default,
  aleph: _aleph.default,
  alexander: _axiaCircle.default,
  altair: _altair.default,
  basilisk: _basilisk.default,
  beast: _beast.default,
  bifrost: _bifrost.default,
  bitcountry: _bitcountry.default,
  calamari: _calamari.default,
  canvas: _canvas.default,
  centrifuge: _centrifuge.default,
  chainx: _chainx.default,
  charcoal: _centrifuge.default,
  clover: _clover.default,
  crab: _crab.default,
  'crown-sterling': _crownSterling.default,
  crust: _crust.default,
  'Crust Maxwell': _crustMaxwell.default,
  darwinia: _darwinia.default,
  datahighway: _datahighway.default,
  'dock-mainnet': _dockMainnet.default,
  'dock-testnet': _dockTestnet.default,
  dotmog: _dotmog.default,
  dusty: _dusty.default,
  eave: _eave.default,
  edgeware: _edgewareCircle.default,
  empty: _empty.default,
  encointer_canary: _encointerNotee.default,
  encointer_cantillon: _encointerTeeproxy.default,
  encointer_gesell: _encointerNotee.default,
  equilibrium: _equilibrium.default,
  fantour: _fantour.default,
  galital: _galitalLogo.default,
  galois: _math.default,
  gamepower: _gamepower.default,
  geek: _geek.default,
  genshiro: _genshiro.default,
  halongbay: _polkafoundry.default,
  hanonycash: _hanonycash.default,
  heiko: _heiko.default,
  idavoll: _idavoll.default,
  integritee: _integritee.default,
  interbtc: _interbtc2.default,
  ipse: _ipse.default,
  jupiter: _jupiter.default,
  karura: _karura.default,
  khala: _khala.default,
  kilt: _kilt.default,
  kintsugi: _kintsugi.default,
  klugdossier: _klug.default,
  kpron: _apron.default,
  kulupu: _kulupu.default,
  axialunar: _axialunar.default,
  kylin: _kylin.default,
  laminar: _laminarCircle.default,
  litentry: _litentry.default,
  loomNetwork: _loom_network.default,
  manta: _manta.default,
  mars: _ares.default,
  moonbaseAlpha: _moonbeam.default,
  moonriver: _moonriver.default,
  moonrock: _moonrock.default,
  moonshadow: _moonshadow.default,
  mybank: _mybank.default,
  nftmart: _nftmart.default,
  nodle: _nodle.default,
  'oak-testnet': _oakTestnet.default,
  opportunity: _opportunity.default,
  'origintrail-allychain-testnet': _origintrail.default,
  pangolin: _pangolin.default,
  pangoro: _pangoro.default,
  phala: _phala.default,
  phoenix: _phoenix.default,
  picasso: _picasso.default,
  plasm: _plasm.default,
  polkadex: _polkadex.default,
  axia: _axiaCircle.default,
  polkafoundry: _polkafoundry.default,
  polkasmith: _polkasmith.default,
  polymesh: _polymesh.default,
  pontem: _pontem.default,
  prism: _prism.default,
  realis: _realis.default,
  riochain: _riochain.default,
  robonomics: _robonomics.default,
  rocky: _crust.default,
  betanet: _betanet.default,
  betanetAcala: _acalaCircle.default,
  betanetApron: _apron.default,
  betanetAres: _ares.default,
  betanetBifrost: _bifrost.default,
  betanetBitCountry: _bitcountry.default,
  betanetChainX: _chainx.default,
  betanetClover: _clover.default,
  betanetCrab: _crab.default,
  betanetCrust: _crust.default,
  betanetDarwinia: _darwinia.default,
  betanetDataHighway: _datahighway.default,
  betanetEave: _eave.default,
  betanetEncointer: _encointerNotee.default,
  betanetGalital: _galitalLogo.default,
  betanetGenshiro: _genshiro.default,
  betanetHydrate: _hydrate.default,
  betanetIdavoll: _idavoll.default,
  betanetInterBTC: _interbtc.default,
  betanetJupiter: _jupiter.default,
  betanetKilt: _kilt.default,
  betanetKonomi: _konomi.default,
  betanetKylin: _kylin.default,
  betanetLaminar: _laminarCircle.default,
  betanetLitentry: _litentry.default,
  betanetLoomNetwork: _loom_network.default,
  betanetManta: _manta.default,
  betanetMathChain: _math.default,
  betanetMoonrock: _moonrock.default,
  betanetOriginTrail: _origintrail.default,
  betanetParami: _parami.default,
  betanetPhala: _phala.default,
  betanetPhoenix: _phoenix.default,
  betanetPlasm: _plasm.default,
  betanetPolkaFoundry: _polkafoundry.default,
  betanetPrism: _prism.default,
  betanetSingLavender: _singlavender.default,
  betanetStandard: _standard.default,
  betanetStatemint: _statemine.default,
  betanetSubDAO: _subdao.default,
  betanetSubsocial: _subsocial.default,
  betanetTick: _betanetTick.default,
  betanetTrack: _betanetTrack.default,
  betanetTrick: _betanetTrick.default,
  betanetTrustBase: _trustbase.default,
  betanetUnitv: _unitv.default,
  betanetVln: _valiu.default,
  betanetZeitgeist: _zeitgeist.default,
  betanetZenlink: _zenlink.default,
  sakura: _sakura.default,
  shadow: _shadow.default,
  shell: _shell.default,
  sherpax: _chainx.default,
  shibuya: _shiden.default,
  shiden: _shiden.default,
  singLavender: _singlavender.default,
  snakenet: _snakenet.default,
  'sora-substrate': _soraSubstrate.default,
  spanner: _spanner.default,
  'spartan-testnet': _subspace.default,
  stafi: _stafi.default,
  statemine: _statemine.default,
  statemint: _statemine.default,
  subgame: _subgame.default,
  'SubGame Gamma': _subgame.default,
  'SubGame Staging': _subgame.default,
  subsocial: _subsocial.default,
  substrate: _substrateHexagon.default,
  substrateContractsNode: _substrateContractsNode.default,
  'ternoa-chaos': _ternoa.default,
  trustbase: _trustbase.default,
  uniarts: _uniarts.default,
  unique: _unique2.default,
  unitv: _unitv.default,
  unorthodox: _unorthodox.default,
  vln: _valiu.default,
  web3games: _web3games.default,
  alphanet: _alphanet_colour.default,
  alphanetStandard: _standard.default,
  westlake: _westlake.default,
  westmint: _statemine.default,
  whala: _whala.default,
  zCloak: _zCloak.default,
  zeitgeist: _zeitgeist.default,
  zero: _zero.default
}; // extension logos

exports.namedLogos = namedLogos;
const extensionLogos = {
  'axia-js': _axiaJs.default
}; // external logos, i.e. for explorers

exports.extensionLogos = extensionLogos;
const externalLogos = {
  commonwealth: _commonwealth.default,
  dotreasury: _dotreasury.default,
  dotscanner: _dotscanner.default,
  polkascan: _polkascan.default,
  polkassembly: _polkassembly.default,
  polkastats: _polkastats.default,
  statescan: _statescan.default,
  subid: _subid.default,
  subscan: _subscan.default
}; // empty logos

exports.externalLogos = externalLogos;
const emptyLogos = {
  empty: _empty.default
}; // preload all

exports.emptyLogos = emptyLogos;
[chainLogos, extensionLogos, externalLogos, namedLogos, nodeLogos, emptyLogos].forEach(imageSet => {
  Object.values(imageSet).forEach(src => {
    new Image().src = src;
  });
});