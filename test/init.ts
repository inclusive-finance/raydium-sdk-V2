import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Raydium, TickUtils } from "../src/index";

async function init() {
  const raydium = await Raydium.load({
    connection: new Connection(clusterApiUrl("mainnet-beta")),
    disableFeatureCheck: true,
    disableLoadToken: true,
  });

  let tickLower = -207244;
  let tickUpper = 161189;
  
  let poolInfo = await raydium.clmm.getPoolInfoFromRpc("HGER4j1jc2NQF1HUWnmR9ijaHAonuGxiCwcDWW1e5MY1");
  console.log("Tick spacing", poolInfo.poolKeys.config.tickSpacing);
  const tickArrayLowerStartIndex = TickUtils.getTickArrayStartIndexByTick(
    tickLower,
    poolInfo.poolKeys.config.tickSpacing,
  );
  const tickArrayUpperStartIndex = TickUtils.getTickArrayStartIndexByTick(
    tickUpper,
    poolInfo.poolKeys.config.tickSpacing,
  );

  console.log("Tick array lower start index", tickArrayLowerStartIndex);
  console.log("Tick array upper start index", tickArrayUpperStartIndex);
}

init();
