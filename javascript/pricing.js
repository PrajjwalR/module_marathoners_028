const statsData = {
  smith: {
    percentage1: "26%",
    description1: "increase in website bookings",
    percentage2: "20%",
    description2: "more sales meetings held",
    percentage3: "360%",
    description3: "increase in partner calls",
  },
  hackerone: {
    percentage1: "169%",
    description1: "return on investment",
    percentage2: "88%",
    description2: "more customers reached YOY",
    percentage3: "114%",
    description3: "more meetings booked YOY",
  },
  airtable: {
    percentage1: "81%",
    description1: "return on investment",
    percentage2: "60%",
    description2: "faster time to schedule",
    percentage3: "2,077",
    description3: "hours saved",
  },
  assante: {
    percentage1: "323%",
    description1: "return on investment",
    percentage2: "143%",
    description2: "increase in client outreach",
    percentage3: "13,607",
    description3: "hours reclaimed",
  },
  texas: {
    percentage1: "22%",
    description1: "increase in enrollment",
    percentage2: "18%",
    description2: "boost in graduation rate",
    percentage3: "40%",
    description3: "growth in research output",
  },
  bitly: {
    percentage1: "50%",
    description1: "increase in link clicks",
    percentage2: "60%",
    description2: "growth in link engagement",
    percentage3: "90%",
    description3: "improvement in brand visibility",
  },
};

function changeStats(company, clickedLogo) {
  const statElements = document.querySelectorAll(".stat");

  const allLogos = document.querySelectorAll(".logos > img");
  allLogos.forEach((logo) => {
    logo.classList.remove("selected");
  });

  clickedLogo.classList.add("selected");

  statElements.forEach((stat) => {
    stat.classList.add("slide-right");
  });

  setTimeout(() => {
    document.getElementById("percentage1").innerText =
      statsData[company].percentage1;
    document.getElementById("description1").innerText =
      statsData[company].description1;
    document.getElementById("percentage2").innerText =
      statsData[company].percentage2;
    document.getElementById("description2").innerText =
      statsData[company].description2;
    document.getElementById("percentage3").innerText =
      statsData[company].percentage3;
    document.getElementById("description3").innerText =
      statsData[company].description3;

    statElements.forEach((stat) => {
      stat.classList.remove("slide-right");
      stat.classList.add("fade-in");
    });
  }, 300);

  setTimeout(() => {
    statElements.forEach((stat) => {
      stat.classList.remove("fade-in");
    });
  }, 800);
}
