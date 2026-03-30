---
title: "egREC"
titleJa: "ECHONET Lite パケットレコーダー egREC"
description: "Captures ECHONET Lite packets and uploads PCAP to Google Drive (or USB) for remote analysis with Wireshark."
descriptionJa: "ECHONET Liteのパケットをキャプチャし、Google Driveへアップロードします。テレワークや他社との共有にも対応。"
category: iot-tools
features:
  - "PC-less remote capture at the installation site"
  - "Hourly gzip-compressed PCAP uploads to Google Drive"
  - "Share captures across organizations via Google Drive"
  - "Telework-friendly: analyze from home with Wireshark"
  - "UDP port 3610 filter (ECHONET Lite)"
  - "USB flash drive storage when preferred over the cloud"
featuresJa:
  - "現場にPCを置かず遠隔地の通信データを収集"
  - "1時間単位でgzip圧縮したPCAPをGoogle Driveへ"
  - "Google Driveの共有設定で会社間のデータ共有が可能"
  - "自宅などからWiresharkで解析（テレワーク対応）"
  - "ECHONET Lite（UDP送信先ポート3610）をフィルタ"
  - "USBメモリへの保存（優先設定可）"
specs:
  - label: "Protocol"
    value: "ECHONET Lite (UDP destination port 3610)"
  - label: "Format"
    value: "PCAP, gzip-compressed every hour"
  - label: "Storage"
    value: "Google Drive and/or USB flash drive"
  - label: "Network"
    value: "Internet, DHCP, DNS (e.g. 8.8.8.8), NTP required"
specsJa:
  - label: "プロトコル"
    value: "ECHONET Lite（UDP・送信先ポート3610）"
  - label: "保存形式"
    value: "PCAP（1時間単位でgzip圧縮）"
  - label: "保存先"
    value: "Google Drive または USBメモリ（設定により優先）"
  - label: "ネットワーク環境"
    value: "インターネット接続、DHCP、DNS（8.8.8.8）、NTPが利用できること"
amazonUrl: "https://www.amazon.co.jp/dp/B08V19DSZZ"
order: 9
bodyJa: |
  **ECHONET Liteのパケットをキャプチャし、Google Driveにアップロード**する装置です。

  HEMSコントローラとECHONET Liteデバイスの間に設置することで、コントローラとの通信パケットをキャプチャできます。

  **特長**

  - PCレスで遠隔地の通信データを収集できます。
  - クラウドにデータを蓄積するので、自宅からでも解析できます（テレワーク対応）。
  - Google Driveの共有設定により、異なる会社間でリアルタイムにデータを共有できます。

  **使い方の流れ**

  1. 本機をネットワークに接続し電源を入れると、自動的にECHONET Liteのパケットだけをキャプチャします。
  2. キャプチャしたデータは定期的にGoogle Driveにアップロードします。
  3. Google Driveからデータをダウンロードし、PC（**Wireshark**）で内容を確認します。

  製品仕様の詳細は[bitset.jp / egREC](https://bitset.jp/products/egrec)をご参照ください。ご購入は弊社へのお問い合わせとなります。
---

egREC captures **ECHONET Lite** traffic—typically UDP to **port 3610**—between a home-energy controller and field devices, then packages it as **gzip-compressed PCAP** on an hourly cadence for upload to **Google Drive** (or retention on **USB flash** when you prefer).

The edge stays **PC-less**: power and network are enough at the site, while analysts pull captures from Drive and open them in **Wireshark**. Shared folders make it practical for **partner companies** to see the same timeline without shuttling media.

Your network must provide **DHCP**, **internet** reachability, **DNS** (the product is validated with **8.8.8.8**), and **NTP** so timestamps stay trustworthy. For integrators who need defensible, shareable evidence of on-site ECHONET behavior, egREC matches the workflow described on [bitset.jp](https://bitset.jp/products/egrec). Purchase is via **direct inquiry** to bitset.
