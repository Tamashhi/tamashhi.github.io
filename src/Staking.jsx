import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledMedia = styled.img`
  width: 100px;
  @media (min-width: 100px) {
    width: 100px;
  }
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px  var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const SmallStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--accent);
  border-radius: 100%;
  width: 50px;
  @media (min-width: 900px) {
    width: 50px;
  }
  @media (min-width: 1000px) {
    width: 50px;
  }
  transition: width 0.5s;
`;
export const MedStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 200px;
  }
  @media (min-width: 1000px) {
    width: 200px;
  }
  transition: width 0.5s;
`;
export const TransparentStyledLogo = styled.img`
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
`;
export const SmallTranStyledLogo = styled.img`
  width: 100px;
  @media (min-width: 900px) {
    width: 10px;
  }
  @media (min-width: 1000px) {
    width: 100px;
  }
`;
export const RMStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px  var(--secondary);
  background-color: var(--accent);
  border-radius: 10%;
  width: 50px;
  @media (min-width: 900px) {
    width: 100px;
  }
  @media (min-width: 1000px) {
    width: 150px;
  }
  transition: width 0.5s;
`;
export const TallRMStyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 2px solid var(--border);
  border-radius: 100px;
  width: 50px;
  @media (min-width: 900px) {
    width: 50px;
  }
  @media (min-width: 1000px) {
    width: 50px;
  }
  transition: width 0.5s;
`;
export const MediaStyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
  `;
export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;


export default function Staking() {
    const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Mint up to 10`);
  const [mintAmount, setMintAmount] = useState(1);
  const [stakeAmount, setStakeAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    STAKING_ADDRESS:"",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    maxMintPerTx: 0,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const stake = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(0);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .stake(stakeAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.STAKING_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, you are not whitelisted.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} staked.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };
  const claimTokens = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(0);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .claimToken(stakeAmount)
      .send({
        gasLimit: String(totalGasLimit),
        from: CONFIG.CONTRACT_ADDRESS,
        to: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, you are not whitelisted.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} staked.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const userTokens = () => {
    blockchain.smartContract.methods
    .ownedTokens()
    .call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log(res)
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setStakeAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setStakeAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{
          backgroundColor: "var(--primary)",
          padding: 24,
          borderRadius: 0,
          border: "2px solid var(--border)",
          boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)"
        }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/back.png" : null}>


        <s.Container flex={1} jc={"center"} ai={"center"} fd={"row"}>
          <s.SpacerLarge />
          <s.SpacerLarge/>
          <TransparentStyledLogo alt={"logo"} src={"/config/images/logoShiny.png"} />
        </s.Container>
        
        <s.SpacerXSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg alt={"Example"} src={"/config/images/yearofthhedragon.jpg"} />
          </s.Container>

          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            image={"/config/images/background.png"}
            style={{
              backgroundColor: "var(--primary)",
              padding: 24,
              borderRadius: 24,
              border: "2px solid var(--border)",
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.7)"
            }}>
              <s.SpacerLarge/><s.SpacerLarge/>
              <s.SpacerMedium />
              {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}>
                  Sold out.
                </s.TextTitle>
                <s.NormalText
                  style={{ textAlign: "center", color: "var(--accent-text)" }}>
                  You can still find {CONFIG.NFT_NAME} on
                </s.NormalText>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)"}}
                >
                  Mint for {CONFIG.DISPLAY_COST}{CONFIG.NETWORK.SYMBOL} each.
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.NormalText
                  style={{ textAlign: "center", color: "var(--accent-text)"}}>
                  Plus reduced gas fees for multiple mints!
                </s.NormalText>
                <s.SpacerSmall />
                {blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.NormalText
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)", 
                      }}>
                      Connect your MetaMask wallet
                    </s.NormalText>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}>
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.NormalText
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)"
                          }}>
                          {blockchain.errorMsg}
                        </s.NormalText>
                      </>
                    ) : null}


                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <MediaStyledLink href="https://twitter.com/tamashhi" target="_blank" >
                        <SmallStyledImg alt="Twitter" src="/config/images/twitter.png" />
                      </MediaStyledLink>
                      <s.SpacerSmall />
                      <MediaStyledLink href="https://discord.gg/cVn7EvyqM2" target="_blank">
                        <SmallStyledImg alt="Discord" src="/config/images/discord.png" />
                      </MediaStyledLink>
                      <s.SpacerSmall />
                      <MediaStyledLink href="https://opensea.io/tamashhi" target="_blank">
                        <SmallStyledImg alt="OpenSea" src="/config/images/openSea.png" />
                      </MediaStyledLink>
                    </s.Container>
                  </s.Container>
            ) : (
              <>
                <s.NormalText
                  style={{
                    textAlign: "center",
                    color: "var(--accent-text)"
                  }}>
                  {feedback}
                </s.NormalText>
                <s.SpacerMedium />
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                <StyledRoundButton
                    style={{ lineHeight: 0.4 }}
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      decrementMintAmount();
                    }}>
                    -
                  </StyledRoundButton>
                  <s.SpacerMedium />
                  <s.NormalText
                    style={{
                      textAlign: "center",
                      color: "var(--accent-text)"
                    }}>
                    {mintAmount}
                  </s.NormalText>
                  <s.SpacerMedium />
                  <StyledRoundButton
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      incrementMintAmount();
                    }}>
                    +
                  </StyledRoundButton>
                </s.Container>
                <s.SpacerSmall />
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <StyledButton
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      stake();
                      getData();
                    }}>
                    {claimingNft ? "BUSY" : "Stake"}
                  </StyledButton>
                  <StyledButton
                    disabled={claimingNft ? 1 : 0}
                    onClick={(e) => {
                      e.preventDefault();
                      claimTokens();
                      getData();
                    }}>
                    {claimingNft ? "BUSY" : "Claim"}
                  </StyledButton>
                </s.Container>


                <s.SpacerMedium />
                <s.Container ai={"center"} jc={"center"} fd={"row"}>
                  <MediaStyledLink href="https://twitter.com/Tamashhi" target="_blank" >
                    <SmallStyledImg alt="Twitter" src="/config/images/twitter.png" />
                  </MediaStyledLink>
                  <s.SpacerSmall />
                  <MediaStyledLink href="https://discord.gg/cVn7EvyqM2" target="_blank">
                    <SmallStyledImg alt="Discord" src="/config/images/discord.png" />
                  </MediaStyledLink>
                  <s.SpacerSmall />
                  <MediaStyledLink href="https://opensea.io" target="_blank">
                    <SmallStyledImg alt="OpenSea" src="/config/images/openSea.png" />
                  </MediaStyledLink>
                </s.Container>
              </>
            )}
          </>
        )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"}>
            <StyledImg
              alt={"Example"}
              src={"/config/images/yearoffthemonkey.jpg"}
              style={{ transform: "scaleX(-1)" }}
            />
          </s.Container>
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.SpacerLarge />

        
        <s.SpacerLarge /><s.SpacerLarge /><s.SpacerLarge />
      </s.Container>
    </s.Screen >
  );
}