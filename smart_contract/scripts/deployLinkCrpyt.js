const main = async () => {
    const LinkCrypt = await hre.ethers.getContractFactory("LinkCrypt");
    const linkCrypt = await LinkCrypt.deploy();
  
    await linkCrypt.deployed();
  
    console.log("Transactions deployed to:", linkCrypt.address);
  }
  
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    }
    catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
  
  runMain();