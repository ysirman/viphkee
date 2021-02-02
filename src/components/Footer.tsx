import React from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer>
      <Container>
        <Typography variant="h5" align="center">
          Privacy Policy
        </Typography>
        <Typography component="p" variant="subtitle2" color="textSecondary">
          保存した設定はブラウザに保存されます。サイドメニューの「Clear
          Playlist」をクリックすることで削除可能です。
        </Typography>
        <Typography component="p" variant="subtitle2" color="textSecondary">
          当サイトでは、アクセス解析に「Googleアナリティクス」を利用しています。
          Googleアナリティクスはトラフィックデータの収集のためにCookieを使用します。
          このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
          この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。
          この規約に関して、詳しくは
          <a
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            こちら
          </a>
          、または
          <a
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
            target="_blank"
            rel="noopener noreferrer"
          >
            こちら
          </a>
          でご確認ください。
        </Typography>
        <Typography component="p" variant="subtitle2" color="textSecondary">
          当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
          当サイトに掲載されている内容については、必ずしもその正確性、信頼性について保証するものではありません。
          当サイトに掲載された内容、及びサービス利用によって生じた損害等の一切の責任を負いかねますのでご了承ください。
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © Viphkee "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
