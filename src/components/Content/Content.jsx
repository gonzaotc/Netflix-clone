import React from "react";
import Row from "./Row";

import "./Content.scss";

const images = [
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUyHp5bSzxxXfSYAt4cT7hfEvXOXuPc5sVyF38hpsPWOaYmD2L2LkbwEfWPdPK_0t-cnwHyhdbIZ6I3MWGe5_DNgCIOWa61atWkb9ytkb2JF5Gfj8seSC0GChwiY.jpg?r=4aa",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTkd4r26vsnXMlgd_Ll_N3KYv7x9Vft3x1dUjdpY6Wt6OPubDf57q4fmuuBtQNwRckEwdnVuCljCyOTQvkaDvxCHsLGUazjHRaTSb_vIrO9XQws4-Mnuza4hvR0o.jpg?r=4a3",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUuSckkdCSrebPg2zaU1uA0aTAQBiAsaBiWZAi_7fC90xQAi-mMiYaC-N-0UoUpA-wN0rJLfoKBYU0ml5Vue-u2w_5u4LFvqj190xt0cm6Laj3tUmDAeCgjU3XHw.jpg?r=bda",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABTEEseVWHJCRo86gs_vwvZzZq-BGGrz0tRDG33RZrMa4NhrzANoQ0wTdleFzJ7SiKPYHhYaP9NJFklI-7Lx145r-GtB6EEmdOQk9iKhdqVsXGOZrXYML3ji5x9Hv.jpg?r=296",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUtFNplRcnHw_P82tywiT1yuSYPc1i0Ov5ZnznYFYQg-FK8JGCxi_GL5UpKZ2d_CPs9ti47YARd55_vX502c3nSzNdlBghiWRm8PP_iCyyJdF5SZVFw5nzb-7s-9.jpg?r=744",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABUaXbfc0RiICV3NXSrplhup7SkdpT-tbHcHQJgzBw10BmWNHCUEEmsbtSOp7-cpvBVojiaPLCdYaAC92bnsAuyvSo9M-QQe-omYDp8967ma2opBES1k9mGH-mp_A.jpg?r=1ed",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABT4Hboe5RziMOpmWbiJTOc2wc76Klq7CKiebk8jp1LN9vlvl8-ua8PLaFkcYDcOpK6KXfKWGGjYuWaYu2VepzUj5P-TGOTSilTyyLkekazZTO35yzxSJh2tIjIit.jpg?r=6f5",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABRR63kfhtf1OAU6UK7mxI43OOr5ZxevpNpuSTaJHjERgxK68-k81yd41Od5RNzyK03u0leOCJVYPblUNDCGPaphXjV4.webp?r=954",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABR-m4hNdf43zWiT7OI0lmxXGD6feE1p8bvIQf8MMuovK0v1O5DBejh9eufe4cDJ9aZPL-PoJPXpC6JIM-ftTJqIzjLlqBmZhl-PH5zKPxGMV02ZrcpX2pwlpIDZX.jpg?r=3cb",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABffAl4z46czjJU-2qj231r6vAlGVfvLVhqgsLnXM0WZ-knRrgi-UMiCkD3KoK-8la0v_ke2MqkSoEkhzqN1F_akc46W8Gq4GNzLEce1E8pyMm3mAQRelmymqBtMk.jpg?r=cbb",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABeQ73VGUcIdCYnLTxWTXNARcQmoBuum4iQAoV9bV64zf15crCtETtByXdF8lEpFRfs6xoqgkDAQz5hT3MX43pY9pz8kJAOhRNjpFPJ9ZR5OlofKPxPQqmnnY7fQZ.jpg?r=f55",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABbFHFjMDKSXCI1GabS5sL1f55SxejXIi3bLf7-aYlg2eO__kd4m-TfKyuH5mGk9yQ3acu4tgjH-7XocYABfYJ0g90PGR0uoHn1D-WnbFJyDdVfyLT4Dfia0AI6Z6.jpg?r=8d2",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABZjxlT4SIlujOqm3lw_mA2KuAHKhHQrRSaXqIMz-SwdhtqmCXTJAVULhaavCzvcieWdr9kGJxfb-P4_v2nFL4RauWD4.webp?r=4ca",
  "https://occ-0-2571-185.1.nflxso.net/dnm/api/v6/X194eJsgWBDE2aQbaNdmCXGUP-Y/AAAABQQNyBjsNeNxBWc3YjhMzA2RsH-zK73L_YF0YNPgCc_c03nWHFhoJBq-YsMpVz1y09oZVXHJ4Ut1vOEcpRSd4jn7rdk.webp?r=de3",
];
const Content = () => {
  return (
    <div className="content">
      <Row title="Nuevos lanzamientos" images={images}/>
      <Row title="Tendencias" images={images}/>
      <Row title="Populares en Netflix" images={images}/>
      <Row title="Películas de suspenso" images={images}/>
    </div>
  );
};

export default Content;
