import './style.css';
import { t } from './i18n.js';

const dom = {
  ip: document.getElementById('icIp'),
  prefix: document.getElementById('icPrefix'),
  calcBtn: document.getElementById('icCalcBtn'),
  output: document.getElementById('icCidrOutput'),
  network: document.getElementById('icNetwork'),
  broadcast: document.getElementById('icBroadcast'),
  netmask: document.getElementById('icNetmask'),
  wildcard: document.getElementById('icWildcard'),
  usable: document.getElementById('icUsable'),
  netClass: document.getElementById('ipCidrClass'),
  first: document.getElementById('icFirst'),
  last: document.getElementById('icLast'),
  total: document.getElementById('icTotal'),
  networkFlag: document.getElementById('icNetworkFlag'),
  broadcastFlag: document.getElementById('icBroadcastFlag'),
  message: document.getElementById('icMessage'),
};

const MAX = 2n ** 32n;

function setMessage(message, error = false) {
  dom.message.textContent = message;
  dom.message.classList.toggle('message--error', error);
}

function parseIp(input) {
  const parts = input.trim().split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map((part) => {
    if (!/^(\d{1,3})$/.test(part)) return null;
    const n = Number(part);
    if (!Number.isInteger(n) || n < 0 || n > 255) return null;
    return n;
  });
  if (nums.some((v) => v == null)) return null;
  return nums;
}

function ipToBigInt(parts) {
  return (
    (BigInt(parts[0]) << 24n) |
    (BigInt(parts[1]) << 16n) |
    (BigInt(parts[2]) << 8n) |
    BigInt(parts[3])
  );
}

function bigIntToIp(value) {
  const v = value & 0xFFFFFFFFn;
  const a = Number((v >> 24n) & 255n);
  const b = Number((v >> 16n) & 255n);
  const c = Number((v >> 8n) & 255n);
  const d = Number(v & 255n);
  return `${a}.${b}.${c}.${d}`;
}

function ipType(parts, prefix) {
  const [a, b] = parts;
  if (a === 10) return 'Private (10/8)';
  if (a === 172 && b >= 16 && b <= 31) return 'Private (172.16/12)';
  if (a === 192 && b === 168) return 'Private (192.168/16)';
  if (a === 127) return 'Loopback';
  if (a === 169 && b === 254) return 'Link-Local';
  if (a >= 224 && a <= 239) return 'Multicast';
  if (a >= 240) return 'Reserved';
  return 'Public';
}

function classifyIp(parts) {
  return ipType(parts);
}

function calculate() {
  setMessage('');

  const ipParts = parseIp(dom.ip.value);
  const prefix = Number(dom.prefix.value);

  if (!ipParts) {
    setMessage(t('ipCidr.error.ip'), true);
    return;
  }
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    setMessage(t('ipCidr.error.prefix'), true);
    return;
  }

  const ipNum = ipToBigInt(ipParts);
  const mask = prefix === 0 ? 0n : ((MAX - 1n) << BigInt(32 - prefix)) & 0xFFFFFFFFn;
  const wildcard = (~mask) & 0xFFFFFFFFn;
  const network = ipNum & mask;
  const hostCount = 2n ** BigInt(32 - prefix);
  const broadcast = network + hostCount - 1n;

  const totalAddresses = hostCount.toString();
  let usable;

  if (prefix === 32) {
    usable = '1';
  } else if (prefix === 31) {
    usable = '2';
  } else {
    usable = (hostCount - 2n).toString();
  }

  const firstHost = prefix === 32 ? network : network + 1n;
  const lastHost = prefix === 32 ? network : (prefix === 31 ? broadcast : broadcast - 1n);

  dom.output.value = `${bigIntToIp(network)}/${prefix}`;
  dom.network.value = bigIntToIp(network);
  dom.broadcast.value = bigIntToIp(broadcast);
  dom.netmask.value = bigIntToIp(mask);
  dom.wildcard.value = bigIntToIp(wildcard);
  dom.usable.value = usable;
  dom.netClass.value = classifyIp(ipParts, prefix);
  dom.first.value = bigIntToIp(firstHost);
  dom.last.value = bigIntToIp(lastHost);
  dom.total.value = totalAddresses;
  dom.networkFlag.checked = ipNum === network;
  dom.broadcastFlag.checked = prefix !== 32 && ipNum === broadcast;

  setMessage(t('ipCidr.success'));
}

dom.calcBtn.addEventListener('click', calculate);
[dom.ip, dom.prefix].forEach((el) => el.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    calculate();
  }
}));

calculate();
