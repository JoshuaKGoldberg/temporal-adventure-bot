import { Game } from "./types";

const happilyEverAfter = [
  `With your family's financial future accounted for, you no longer need to struggle to exist.`,
  `Your family uses its profits to invest in more farm production, nicer living quarters, and -best of all- a fresh young cow to keep as a pet.`,
  `No cow could ever replace your beloved Bessy but it's best not to dwell on the past.`,
  `You and your family live happily ever after.`,
];

const poorDeath = `Unable to make a profit from Bessy, your family falls on even harder times and loses your farm and house. 17th century England has no social protection programs and the entire family all dies miserably.`;

export const game: Game = {
  acceptCards: {
    description: [
      `A friendly game of cards with the new neighbors seems like a fun idea.`,
      `You follow Blunderbore through the mansion to a living room dominated by a massive table underneath several small stacks of large playing cards.`,
      `Seated at the table is a tall, thin giant with wisps of bright red hair drinking a glass of milk.`,
      `Blunderbore deals a set of cards and explains the rules to you.`,
      `Alas, you are a simple farmer, and are unable to piece together what you're meant to do.`,
      `You're not sure what's happening in the game but you get the impression you're holding your own and Blunderbore is losing.`,
      `After a particularly long round of play, Blunderbore is out of cards on his side of the table.`,
      `He groans angrily, stomps to an adjacent room, and comes back with three bags of gold.`,
      `Blunderbore tosses the bag into the center of the table with grumble: _"A last round, against the two of you. Add your own wagers?"_.`,
      `The red-haired giant gives the slightest of nods and gently slides the glass of milk next to the bag.`,
      `They glance in your direction and for the briefest of moments it seems they flash a wink your way.`,
    ],
    options: [
      {
        description: `Decline`,
        next: `declineWager`,
      },
      {
        description: `Wager your rake`,
        next: `acceptWager`,
      },
    ],
  },
  acceptWager: {
    description: [
      `Your last two days have already gone bizarrely. Might as well double down.`,
      `You place your trusty rake on the table with the bag of gold and glass of milk.`,
      `Blunderbore flips the cards over...`,
      `...and immediately shouts in rage. Looks like he lost!`,
      `The red-haired giant pulls the milk and bags of gold onto their section of the table.`,
      `They take a long drink of milk, finishing the glass, and smile.`,
      `_"A pleasure doing business with you, giant. You as well, human."_`,
      `They hand you one of the bags and take the other two out the door.`,
      `Blunderbore stomps off into another room. You can hear his curses echoing. Now seems like a very good time to leave.`,
      `You make your way back down the beanstalk to the family farm.`,
      ...happilyEverAfter,
    ],
  },
  begin: {
    description: [
      `Good morning, Jack Spriggins! It's a beautiful day in 18th century England. Your family farm, plagued by thievery and misfortune, has fallen on hard times. Your parents told you to sell your beloved old pet cow Bessy for coin to purchase more chickens. The market is opening soon and you should take Bessy to be sold.`,
    ],
    options: [
      {
        description: `Sleep in and enjoy the morning`,
        next: `sleep`,
      },
      {
        description: `Spend one last good morning bonding with Bessy`,
        next: `bond`,
      },
      {
        description: `Take Bessy to the market`,
        next: `market`,
      },
    ],
  },
  bond: {
    description: [
      `You can still remember the day your parents took in Bessy as a pet. She was a gentle cow who never kicked anybody or ate more than her share of grass. Truly a gentle and kind spirit.`,
      `These days she doesn't have the same fire in her spirit or jump in her step the way she used to. Yet she still lumbers over to the door to greet you as you take her her morning feed snack. You reward her spirit with gentle pets and scratches in the spot behind her ear she enjoys so much.`,
      `Walking with Bessy through your family fields warms your heart in a way only old Bessy can. You just can't bring yourself to take her to the market.`,
      poorDeath,
    ],
  },
  burn: {
    description: [
      `Clearly the hooded figure was a demon! Such witchcraft cannot be tolerated!`,
      `You douse the beanstalk in what little oil your family has left and light it on fire.`,
      poorDeath,
    ],
  },
  cut: {
    description: [
      `Clearly the hooded figure was an angel! Such a bountiful supply of material could provide your family with firewood to use and sell for months and months.`,
      `You hack away into the trunk of the beanstalk until it falls down across the length of your pastures.`,
      `It provides enough wood to warm the house for the next winter and still have enough for several winters over.`,
      `You sell the rest of the wood at the market at bulk discount prices.`,
      `As you lay down to sleep that night you feel a kinship for Bessy and hope her new owner is treating her well.`,
      ...happilyEverAfter,
    ],
  },
  climb: {
    description: [
      `If the beanstalk goes up all the way past the clouds, surely there must be treasure up above!`,
      `The sides of the beanstalk are rough enough that you're able to climb all the way up using your trusty rake as a walking stick.`,
      `You find the beanstalk ends just after rising above a dense white puffy cloud.`,
      `Amazingly, you can step off the beanstalk on top of the cloud.`,
      `It feels like stepping into a shallow pond but with slow puffs of air at your feet instead of water.`,
      `Not but twenty paces from the tip of the beanstalk is the entrance to an extravagantly large mansion.`,
      `The mansion is large both in its architecture -four stories with dozens of windows each- as well as its physical scale, with a front door seemingly made for twice the height or width of a normal person.`,
    ],
    options: [
      {
        description: `Head home`,
        next: `nope`,
      },
      {
        description: `Knock on the front door`,
        next: `knock`,
      },
      {
        description: `Sneak in through the window`,
        next: `sneak`,
      },
    ],
  },
  declineCards: {
    description: [
      `You thank Blunderbore for the kind invite and graciously excuse yourself as needing to attend to the family farm.`,
      `The two of you cheerfully wish each other good tidings before you make your way back down the beanstalk.`,
      poorDeath,
    ],
  },
  declineWager: {
    description: [
      `You don't feel comfortable committing to such a wager when you don't comprehend the game itself.`,
      `Both seem a little disappointed.`,
      `You thank the two for their hospitality and make your way back down the beanstalk to the family farm.`,
      poorDeath,
    ],
  },
  introduce: {
    description: [
      `Elevation levels notwithstanding, you suppose this giant is your neighbor and it would only be proper to politely introduce yourself as such.`,
      `The giant introduces himself as Blunderbore and the two of you have a pleasant chat.`,
      `He invites you inside to join him in a friendly game of cards.`,
    ],
    options: [
      {
        description: `Accept the invite`,
        next: `acceptCards`,
      },
      {
        description: `Decline the invite`,
        next: `declineCards`,
      },
    ],
  },
  knock: {
    description: [
      `You knock politely on the front door of the mansion.`,
      `A minute passes by with no response.`,
    ],
    options: [
      {
        description: `Knock loudly`,
        next: `knockLoudly`,
      },
      {
        description: `Sneak in through the window`,
        next: `sneak`,
      },
    ],
  },
  knockLoudly: {
    description: [
      `You knock loudly on the front door of the mansion.`,
      `A booming voice bellows out from within: _"coming!"_.`,
      `Moments later the door opens to reveal a sweaty twelve-foot-high giant of a man dressed as a gentleman.`,
      `He raises his hat at you and calmly bids you a good morning.`,
    ],
    options: [
      {
        description: `Introduce yourself as a neighbor`,
        next: `introduce`,
      },
      {
        description: `Scream and run away`,
        next: `scream`,
      },
    ],
  },
  market: {
    description: [
      `Bessy is a good old cow and follows you to the market without resistance. You try bringing her to several booths to trade but nobody wants an old cow.`,
      `After a few grueling hours of haggling and pleading, you're just about ready to go home...`,
      `...when suddenly, emerging out of the shadows behind a vegetable booth, a tall, thin, hooded figure steps in front of you.`,
      `Their hood obscures their face but you can see wisps of bright red hair glimmering through.`,
      `_"Hello, Jack"_, the figure murmurs in a voice both gently quiet and yet clear to hear.`,
      `_"I would like to purchase your Bessy. I have no coin of man but can offer you a set of magic beans. Plant them in your farm tonight and come tomorrow morning they will grow beyond your wildest dreams."_`,
    ],
    options: [
      {
        description: `Refuse the figure's offer and keep Bessy`,
        next: `refuseBeans`,
      },
      {
        description: `Accept the figure's offer`,
        next: `takeBeans`,
      },
      {
        description: `Accost the figure and steal the beans`,
        next: `stealBeans`,
      },
    ],
  },
  nope: {
    description: [
      `There be giants. Your parents raised you better than to meddle in the affairs of gigantic mythical creatures.`,
      `You nope on out of there and make your way back home.`,
      poorDeath,
    ],
  },
  refuseBeans: {
    description: [
      `You roll your eyes at the figure. Nobody with two shillings of sense would accept such a ludicrous offer.`,
      `You take Bessy home and enjoy an afternoon relaxing together.`,
      poorDeath,
    ],
  },
  scream: {
    description: [
      `Ack! A giant!`,
      `You scream in terror and bolt back to the beanstalk, dropping your rake behind you.`,
      `The way back down without the rake is difficult.`,
      `Midway through, you lose your balance and plummet down to your death`,
      poorDeath,
    ],
  },
  sleep: {
    description: [
      `You enjoy a few more hours of glorious blissful sleep. Sadly, when you wake up, you find Bessy passed away in her old age.`,
      poorDeath,
    ],
  },
  sloth: {
    description: [
      `You enjoy a few more hours of glorious blissful sleep and continue as if nothing was different.`,
      poorDeath,
    ],
  },
  sneak: {
    description: [
      `Curiosity overtakes you and you hoist yourself onto a partially open first floor window to peek inside. You can't see or hear anybody in the mansion.`,
      `You wedge the window open with your trusty rake and slink inside. The room you enter is a long hallway with closed doors on either end. You walk towards one of the doors.`,
      `Suddenly, you hear an angry yell from behind one of the doors:`,
      `_"Fee-fi-fo-fum!"_`,
      `_"I smell the blood of an Englishman."_`,
      `_"Be he alive, or be he dead,"_`,
      `_"I'll grind his bones to make my bread."_`,
      `The door opens to reveal a sweaty twelve-foot-high giant of a man dressed as a gentleman.`,
      `You try to run but there's no use: the giant catches up to you before you make it back to the window.`,
      `The last thing you see is the lush carpet unexpectedly rushing to meet your head: and then, nothing.`,
      poorDeath,
    ],
  },
  stealBeans: {
    description: [
      `You roll your eyes and sneer at the figure. Only a fool would bring magic items to the market without guards to protect them.`,
      `Quick as a whip, you lunge forward and reach for the figure...`,
      `...but even quicker, the figure disappears.`,
      poorDeath,
    ],
  },
  takeBeans: {
    description: [
      `Desperate and intrigued, you agree to trade your dear old Bessy for the dubious magic beans.`,
      `The stranger seems mysterious enough that the beans might be legit -- and Bessy is at the end of her rope anyway.`,
      `You plant the beans later that night.`,
      `Lo and behold, the next morning, a _massive_ beanstalk -higher than the clouds and as thick as a horse- has grown right out of where you planted the beans.`,
      `You can barely believe it, but there it is.`,
    ],
    options: [
      {
        description: `Do nothing`,
        next: `sloth`,
      },
      {
        description: `Burn down the beanstalk! Evil!`,
        next: `burn`,
      },
      {
        description: `Cut down the beanstalk for wood`,
        next: `cut`,
      },
      {
        description: `Climb up the beanstalk`,
        next: `climb`,
      },
    ],
  },
};
