import { Type } from "../types";

export const QUESTIONS: Type.Question[] = [
  // A - 情绪管理 (Emotion Management)
  {
    id: 1,
    text: "当精心准备的旅行计划因天气彻底泡汤时，你第一时间会？",
    options: [
      { text: "“真倒霉！”立刻情绪低落，抱怨一整天。", score: 1 },
      { text: "叹口气，回家睡觉，但心里一直惋惜。", score: 2 },
      { text: "虽然失望，但马上查攻略，换个室内活动。", score: 3 },
      { text: "“塞翁失马！”立刻找朋友组局，觉得这样也不错。", score: 4 }
    ],
    dimensions: ["A", "C"]
  },
  {
    id: 2,
    text: "在网上看到与自己观点截然相反的爆款文章，你的第一反应是？",
    options: [
      { text: "“什么狗屁文章！”立马留言开怼，然后划走。", score: 1 },
      { text: "心里不服，点个“不感兴趣”，不想再看。", score: 2 },
      { text: "好奇地快速浏览，琢磨“为什么这种观点能火”。", score: 3 },
      { text: "认真看完并思考其合理之处，甚至做点笔记。", score: 4 }
    ],
    dimensions: ["A", "B"]
  },
  {
    id: 3,
    text: "被上司或长辈在公开场合误解并批评时，你会？",
    options: [
      { text: "当场顶撞，甚至忍不住掉眼泪。", score: 1 },
      { text: "强忍怒火，低头不语，事后疯狂吐槽。", score: 2 },
      { text: "平静地听完，私下找机会委婉解释清楚。", score: 3 },
      { text: "反思对方为何会误解，并思考如何优化沟通。", score: 4 }
    ],
    dimensions: ["A", "B"]
  },
  {
    id: 4,
    text: "排队时有人插队，你的处理方式通常是？",
    options: [
      { text: "大声斥责对方，甚至发生口角。", score: 1 },
      { text: "盯着对方看，心里默默诅咒，但不敢出声。", score: 2 },
      { text: "礼貌提醒：“不好意思，大家都在排队。”", score: 3 },
      { text: "如果不赶时间就随他去，觉得没必要动气。", score: 4 }
    ],
    dimensions: ["A", "C"]
  },
  {
    id: 5,
    text: "面对突如其来的巨额工作压力，你的状态是？",
    options: [
      { text: "焦虑到失眠，甚至想直接辞职逃避。", score: 1 },
      { text: "机械地加班，边做边抱怨命苦。", score: 2 },
      { text: "列出清单，分清轻重缓急，逐一击破。", score: 3 },
      { text: "调整心态，将其视为提升能力的挑战。", score: 4 }
    ],
    dimensions: ["A", "C"]
  },
  // B - 社会认知 (Social Cognition)
  {
    id: 6,
    text: "对于“人情世故”和“潜规则”，你的看法是？",
    options: [
      { text: "非常反感，觉得世界充满了虚伪。", score: 1 },
      { text: "不得不遵守，但内心感到很疲惫。", score: 2 },
      { text: "理解其存在的合理性，并能得体应对。", score: 3 },
      { text: "洞察人性本质，游刃有余而不失自我。", score: 4 }
    ],
    dimensions: ["B", "D"]
  },
  {
    id: 7,
    text: "当一个很久没联系的朋友突然找你借钱，你会？",
    options: [
      { text: "直接拉黑或找借口大吵一架。", score: 1 },
      { text: "纠结半天，最后勉强借出或生硬拒绝。", score: 2 },
      { text: "根据对方人品和自己的能力，理智决定。", score: 3 },
      { text: "温和地询问原因，给出建议或力所能及的帮助。", score: 4 }
    ],
    dimensions: ["B", "C"]
  },
  {
    id: 8,
    text: "你如何看待职场中的“站队”现象？",
    options: [
      { text: "觉得很幼稚，谁也不理，结果被孤立。", score: 1 },
      { text: "随大流，哪边人多往哪边靠。", score: 2 },
      { text: "保持中立，用专业能力证明自己的价值。", score: 3 },
      { text: "理解利益博弈，在保护自己的前提下寻求共赢。", score: 4 }
    ],
    dimensions: ["B", "D"]
  },
  {
    id: 9,
    text: "在聚会上，如果你发现自己完全插不上话，你会？",
    options: [
      { text: "觉得尴尬极了，一直低头玩手机。", score: 1 },
      { text: "强行找话题，结果冷场更尴尬。", score: 2 },
      { text: "安静地倾听，偶尔微笑点头示意。", score: 3 },
      { text: "观察每个人的反应，享受这种旁观的乐趣。", score: 4 }
    ],
    dimensions: ["B", "E"]
  },
  {
    id: 10,
    text: "对于“成功”的定义，你更倾向于？",
    options: [
      { text: "出人头地，赚很多钱，让别人羡慕。", score: 1 },
      { text: "有一份稳定的工作和美满的家庭。", score: 2 },
      { text: "能自由地做自己喜欢的事，实现自我价值。", score: 3 },
      { text: "内心平和，对世界有贡献，不被外物所累。", score: 4 }
    ],
    dimensions: ["B", "D"]
  },
  // C - 行为模式 (Behavior Pattern)
  {
    id: 11,
    text: "买东西时，你通常的决策过程是？",
    options: [
      { text: "看一眼就心动，立马下单，事后常后悔。", score: 1 },
      { text: "反复对比价格，纠结很久才买。", score: 2 },
      { text: "明确需求，看好品质和性价比后购买。", score: 3 },
      { text: "只买真正需要的，不被促销和广告诱惑。", score: 4 }
    ],
    dimensions: ["C", "D"]
  },
  {
    id: 12,
    text: "面对一个全新的、从未接触过的领域，你会？",
    options: [
      { text: "觉得太难了，直接放弃尝试。", score: 1 },
      { text: "等别人都做了，自己才慢慢跟进。", score: 2 },
      { text: "主动找资料学习，尝试小步快跑。", score: 3 },
      { text: "系统性研究，制定计划并快速上手。", score: 4 }
    ],
    dimensions: ["C", "B"]
  },
  {
    id: 13,
    text: "你的房间或办公桌通常是什么样子的？",
    options: [
      { text: "乱七八糟，找东西全靠运气。", score: 1 },
      { text: "偶尔整理一下，很快又变乱了。", score: 2 },
      { text: "比较整洁，有基本的分类和归档。", score: 3 },
      { text: "极简主义，每样东西都有固定的位置。", score: 4 }
    ],
    dimensions: ["C", "A"]
  },
  {
    id: 14,
    text: "在制定年度计划时，你的态度是？",
    options: [
      { text: "从来不制定，觉得计划赶不上变化。", score: 1 },
      { text: "雄心勃勃写一堆，结果坚持不到一周。", score: 2 },
      { text: "制定可执行的目标，并定期回顾进度。", score: 3 },
      { text: "将目标拆解到每天，形成自律的习惯。", score: 4 }
    ],
    dimensions: ["C", "D"]
  },
  {
    id: 15,
    text: "遇到困难时，你的第一反应通常是？",
    options: [
      { text: "找人抱怨，希望别人帮自己解决。", score: 1 },
      { text: "自己闷头苦干，实在不行就放弃。", score: 2 },
      { text: "分析原因，寻找多种解决方案。", score: 3 },
      { text: "冷静思考，寻求专业建议并果断行动。", score: 4 }
    ],
    dimensions: ["C", "A"]
  },
  // D - 价值观 (Values)
  {
    id: 16,
    text: "如果你突然中了一百万大奖，你会？",
    options: [
      { text: "立马辞职，开始报复性消费。", score: 1 },
      { text: "存起来，觉得心里踏实多了。", score: 2 },
      { text: "拿出一部分投资，一部分改善生活。", score: 3 },
      { text: "平淡对待，继续按原计划生活和学习。", score: 4 }
    ],
    dimensions: ["D", "C"]
  },
  {
    id: 17,
    text: "你如何看待“孤独”？",
    options: [
      { text: "非常害怕孤独，一刻也离不开人。", score: 1 },
      { text: "觉得孤独很凄凉，尽量让自己忙起来。", score: 2 },
      { text: "享受孤独，觉得那是自我对话的时间。", score: 3 },
      { text: "孤独是生命的常态，在孤独中获得力量。", score: 4 }
    ],
    dimensions: ["D", "A"]
  },
  {
    id: 18,
    text: "对于“金钱”，你的核心态度是？",
    options: [
      { text: "唯一的追求，有了钱就有一切。", score: 1 },
      { text: "生存的保障，越多越好。", score: 2 },
      { text: "实现目标的工具，够用就好。", score: 3 },
      { text: "身外之物，不应被其束缚灵魂。", score: 4 }
    ],
    dimensions: ["D", "B"]
  },
  {
    id: 19,
    text: "你认为人生最重要的品质是？",
    options: [
      { text: "聪明伶俐，能占到便宜。", score: 1 },
      { text: "勤奋努力，踏实肯干。", score: 2 },
      { text: "独立思考，不随波逐流。", score: 3 },
      { text: "慈悲智慧，利他自省。", score: 4 }
    ],
    dimensions: ["D", "B"]
  },
  {
    id: 20,
    text: "面对衰老，你的心态是？",
    options: [
      { text: "极度恐惧，想尽办法留住青春。", score: 1 },
      { text: "无奈接受，感叹岁月不饶人。", score: 2 },
      { text: "优雅老去，每个阶段都有其魅力。", score: 3 },
      { text: "超越肉体，追求精神的永恒成长。", score: 4 }
    ],
    dimensions: ["D", "A"]
  },
  // E - 娱乐趣味 (Entertainment/Fun)
  {
    id: 21,
    text: "周末休息时，你最向往的放松方式是？",
    options: [
      { text: "去夜店或KTV狂欢到深夜。", score: 1 },
      { text: "宅在家里刷剧、打游戏。", score: 2 },
      { text: "去户外徒步或逛逛艺术展。", score: 3 },
      { text: "静静地读一本书或冥想。", score: 4 }
    ],
    dimensions: ["E", "C"]
  },
  {
    id: 22,
    text: "你喜欢的电影类型通常是？",
    options: [
      { text: "无脑爽片，只要特效好就行。", score: 1 },
      { text: "热门大片，大家都看的我也看。", score: 2 },
      { text: "剧情深刻、引人深思的文艺片。", score: 3 },
      { text: "富有哲学意味或独特视角的纪录片。", score: 4 }
    ],
    dimensions: ["E", "D"]
  },
  {
    id: 23,
    text: "在社交媒体上，你更喜欢发布什么内容？",
    options: [
      { text: "各种自拍和炫耀性的消费。", score: 1 },
      { text: "转发一些有趣但不一定真实的段子。", score: 2 },
      { text: "记录生活点滴和真实的感悟。", score: 3 },
      { text: "分享有价值的知识或深度的思考。", score: 4 }
    ],
    dimensions: ["E", "B"]
  },
  {
    id: 24,
    text: "如果你去旅行，你更喜欢？",
    options: [
      { text: "去网红景点打卡拍照。", score: 1 },
      { text: "跟着旅行团，不用操心行程。", score: 2 },
      { text: "深度自由行，体验当地风土人情。", score: 3 },
      { text: "去人迹罕至的地方探索未知。", score: 4 }
    ],
    dimensions: ["E", "C"]
  },
  {
    id: 25,
    text: "对于“流行语”和“网络热梗”，你的态度是？",
    options: [
      { text: "疯狂使用，觉得这样才显得年轻。", score: 1 },
      { text: "偶尔用用，为了跟上时代。", score: 2 },
      { text: "知道意思，但很少主动使用。", score: 3 },
      { text: "基本不关注，觉得语言应更有深度。", score: 4 }
    ],
    dimensions: ["E", "B"]
  },
  {
    id: 26,
    text: "当你在公共场合发现自己的衣服穿反了，你会？",
    options: [
      { text: "尴尬得想钻进地缝，立刻找地方换回来。", score: 1 },
      { text: "假装淡定，但心里一直打鼓，坐立难安。", score: 2 },
      { text: "大方一笑，甚至自嘲一下，找机会换好。", score: 3 },
      { text: "觉得这很有趣，甚至想就这样穿一天。", score: 4 }
    ],
    dimensions: ["A", "E"]
  },
  {
    id: 27,
    text: "对于“朋友圈”的点赞和评论，你更在意？",
    options: [
      { text: "非常在意，没人点赞会觉得很失落。", score: 1 },
      { text: "比较在意，会经常刷新看有没有新消息。", score: 2 },
      { text: "不太在意，只是作为记录生活的方式。", score: 3 },
      { text: "完全不在意，甚至很少发朋友圈。", score: 4 }
    ],
    dimensions: ["B", "D"]
  },
  {
    id: 28,
    text: "如果你的好朋友做了一件让你失望的事，你会？",
    options: [
      { text: "立刻绝交，甚至在背后说他坏话。", score: 1 },
      { text: "生闷气，等对方主动来道歉。", score: 2 },
      { text: "找个机会开诚布公地谈一谈。", score: 3 },
      { text: "反思这段关系，理智决定未来的相处方式。", score: 4 }
    ],
    dimensions: ["B", "A"]
  },
  {
    id: 29,
    text: "面对“内卷”严重的职场环境，你的策略是？",
    options: [
      { text: "被迫加入，焦虑到不行，还要硬撑。", score: 1 },
      { text: "随大流，别人卷我也卷，不求出头只求不落后。", score: 2 },
      { text: "寻找差异化竞争，提升核心不可替代性。", score: 3 },
      { text: "坚持自己的节奏，追求工作与生活的平衡。", score: 4 }
    ],
    dimensions: ["C", "D"]
  },
  {
    id: 30,
    text: "你如何看待“断舍离”？",
    options: [
      { text: "完全做不到，觉得每样东西都有纪念意义。", score: 1 },
      { text: "想做但很难坚持，家里还是堆满东西。", score: 2 },
      { text: "定期清理，只保留真正需要和心动的东西。", score: 3 },
      { text: "极简生活，不被物质所累，追求精神自由。", score: 4 }
    ],
    dimensions: ["D", "C"]
  },
  {
    id: 31,
    text: "在团队合作中，如果有人拖了后腿，你会？",
    options: [
      { text: "当众指责，表达强烈的不满。", score: 1 },
      { text: "心里抱怨，但还是默默帮他把活干了。", score: 2 },
      { text: "私下沟通，了解困难并提供必要的帮助。", score: 3 },
      { text: "分析流程漏洞，思考如何从制度上规避风险。", score: 4 }
    ],
    dimensions: ["B", "C"]
  },
  {
    id: 32,
    text: "你对“人工智能”取代人类工作的看法是？",
    options: [
      { text: "极度焦虑，觉得未来一片黑暗。", score: 1 },
      { text: "顺其自然，觉得那是很久以后的事。", score: 2 },
      { text: "积极学习AI工具，提升自己的效率。", score: 3 },
      { text: "思考人类独有的价值，探索人机协作的可能。", score: 4 }
    ],
    dimensions: ["D", "B"]
  },
  {
    id: 33,
    text: "如果你发现自己被拉进了一个满是陌生人的群聊，你会？",
    options: [
      { text: "立刻退群，觉得被打扰了。", score: 1 },
      { text: "默默潜水，看看大家都在聊什么。", score: 2 },
      { text: "礼貌询问，确认是否误入后决定去留。", score: 3 },
      { text: "观察群生态，甚至尝试结交有趣的人。", score: 4 }
    ],
    dimensions: ["B", "E"]
  },
  {
    id: 34,
    text: "面对“消费主义”的陷阱，你的抵抗力如何？",
    options: [
      { text: "几乎为零，看到广告就想买。", score: 1 },
      { text: "一般，经常被直播间气氛带动下单。", score: 2 },
      { text: "较强，会理性分析是否真的需要。", score: 3 },
      { text: "极强，有自己稳定的审美和价值观。", score: 4 }
    ],
    dimensions: ["D", "C"]
  },
  {
    id: 35,
    text: "你如何看待“失败”？",
    options: [
      { text: "毁灭性的打击，觉得自己一无是处。", score: 1 },
      { text: "很沮丧，需要很长时间才能走出来。", score: 2 },
      { text: "宝贵的经验，分析原因后再次尝试。", score: 3 },
      { text: "成长的必经之路，甚至感谢失败带来的启示。", score: 4 }
    ],
    dimensions: ["A", "D"]
  },
  {
    id: 36,
    text: "在社交场合，你更倾向于？",
    options: [
      { text: "成为焦点，享受被关注的感觉。", score: 1 },
      { text: "随和地融入，不显山不露水。", score: 2 },
      { text: "寻找志同道合的人进行深度交流。", score: 3 },
      { text: "安静观察，享受这种社交氛围而不参与。", score: 4 }
    ],
    dimensions: ["B", "E"]
  },
  {
    id: 37,
    text: "对于“仪式感”，你的看法是？",
    options: [
      { text: "觉得很麻烦，完全没必要。", score: 1 },
      { text: "偶尔配合一下，觉得那是给别人看的。", score: 2 },
      { text: "非常看重，觉得那是对生活的热爱。", score: 3 },
      { text: "仪式感在心中，不拘泥于形式。", score: 4 }
    ],
    dimensions: ["E", "D"]
  },
  {
    id: 38,
    text: "你如何处理自己的负面情绪？",
    options: [
      { text: "任由其爆发，伤害到身边的人。", score: 1 },
      { text: "压抑在心里，慢慢消化。", score: 2 },
      { text: "寻找健康的宣泄方式，如运动或倾诉。", score: 3 },
      { text: "觉察情绪背后的需求，从源头上化解。", score: 4 }
    ],
    dimensions: ["A", "C"]
  },
  {
    id: 39,
    text: "面对“不公平”的事情，你会？",
    options: [
      { text: "愤怒控诉，甚至采取极端行为。", score: 1 },
      { text: "在心里抱怨，但选择忍气吞声。", score: 2 },
      { text: "在规则范围内据理力争。", score: 3 },
      { text: "思考不公平的根源，寻求更智慧的解决之道。", score: 4 }
    ],
    dimensions: ["D", "B"]
  },
  {
    id: 40,
    text: "你如何看待“金钱”与“幸福”的关系？",
    options: [
      { text: "钱越多越幸福，没钱就没幸福。", score: 1 },
      { text: "钱是幸福的基础，但不是全部。", score: 2 },
      { text: "钱能解决大部分烦恼，但买不来真正的幸福。", score: 3 },
      { text: "幸福源于内心，与金钱多寡关系不大。", score: 4 }
    ],
    dimensions: ["D", "A"]
  },
  {
    id: 41,
    text: "在学习新技能时，你更看重？",
    options: [
      { text: "能不能马上变现或炫耀。", score: 1 },
      { text: "能不能帮我解决当下的问题。", score: 2 },
      { text: "技能背后的逻辑和体系。", score: 3 },
      { text: "学习过程带来的自我成长和愉悦。", score: 4 }
    ],
    dimensions: ["C", "E"]
  },
  {
    id: 42,
    text: "你如何看待“跨界”和“斜杠青年”？",
    options: [
      { text: "觉得是不务正业，什么都学不精。", score: 1 },
      { text: "觉得很酷，但自己不敢尝试。", score: 2 },
      { text: "尝试发展副业，增加收入和体验。", score: 3 },
      { text: "打破边界，构建多元的人生可能。", score: 4 }
    ],
    dimensions: ["B", "C"]
  },
  {
    id: 43,
    text: "面对“催婚”或“催生”，你的反应是？",
    options: [
      { text: "激烈对抗，甚至和家人闹翻。", score: 1 },
      { text: "表面答应，心里烦得要死。", score: 2 },
      { text: "温和而坚定地表达自己的生活选择。", score: 3 },
      { text: "理解长辈的焦虑，用行动证明自己过得很好。", score: 4 }
    ],
    dimensions: ["A", "B"]
  },
  {
    id: 44,
    text: "你对“二次元”或“亚文化”的态度是？",
    options: [
      { text: "完全无法理解，觉得很幼稚。", score: 1 },
      { text: "不感兴趣，但也不排斥。", score: 2 },
      { text: "尊重差异，甚至觉得有些很有趣。", score: 3 },
      { text: "深入了解其背后的文化逻辑和社会意义。", score: 4 }
    ],
    dimensions: ["E", "B"]
  },
  {
    id: 45,
    text: "如果你可以穿越回过去，你会？",
    options: [
      { text: "弥补遗憾，改变那些让自己后悔的选择。", score: 1 },
      { text: "利用先知优势去赚大钱。", score: 2 },
      { text: "只是作为一个旁观者，看看当年的自己。", score: 3 },
      { text: "不愿回去，觉得每个阶段的经历都是财富。", score: 4 }
    ],
    dimensions: ["D", "A"]
  },
  {
    id: 46,
    text: "你如何看待“社交恐惧症”？",
    options: [
      { text: "觉得那是怪胎，不理解为什么怕社交。", score: 1 },
      { text: "觉得自己也有点，尽量逃避社交。", score: 2 },
      { text: "理解这是一种心理状态，尝试温和克服。", score: 3 },
      { text: "社交只是选择，享受独处也是一种能力。", score: 4 }
    ],
    dimensions: ["B", "A"]
  },
  {
    id: 47,
    text: "在处理紧急任务时，你的状态通常是？",
    options: [
      { text: "手忙脚乱，压力大到想哭。", score: 1 },
      { text: "机械执行，只求快点做完。", score: 2 },
      { text: "冷静应对，分清主次，高效完成。", score: 3 },
      { text: "在压力中寻找心流，享受解决问题的快感。", score: 4 }
    ],
    dimensions: ["C", "A"]
  },
  {
    id: 48,
    text: "你如何看待“网红”和“流量”？",
    options: [
      { text: "疯狂追捧，觉得他们就是成功的标杆。", score: 1 },
      { text: "偶尔关注，作为消遣。", score: 2 },
      { text: "理性看待，分析其背后的商业逻辑。", score: 3 },
      { text: "警惕流量带来的浮躁，追求更有深度的内容。", score: 4 }
    ],
    dimensions: ["B", "D"]
  },
  {
    id: 49,
    text: "面对“生老病死”，你的态度更接近？",
    options: [
      { text: "极度恐惧，不敢谈论这些话题。", score: 1 },
      { text: "无奈叹息，觉得那是无法抗拒的命运。", score: 2 },
      { text: "珍惜当下，让有限的生命更有意义。", score: 3 },
      { text: "看淡生死，追求灵魂的宁静与超越。", score: 4 }
    ],
    dimensions: ["D", "A"]
  },
  {
    id: 50,
    text: "你如何看待“知识付费”？",
    options: [
      { text: "觉得是交智商税，网上到处是免费的。", score: 1 },
      { text: "买了很多课，但基本没看完。", score: 2 },
      { text: "有选择地购买，并认真学习内化。", score: 3 },
      { text: "构建自己的知识体系，按需获取高质量信息。", score: 4 }
    ],
    dimensions: ["C", "D"]
  },
  {
    id: 51,
    text: "在旅行中遇到突发状况（如丢钱包），你会？",
    options: [
      { text: "瞬间崩溃，觉得整个旅程都毁了。", score: 1 },
      { text: "手足无措，只会给家里打电话求助。", score: 2 },
      { text: "冷静报警并挂失，寻找替代方案。", score: 3 },
      { text: "将其视为旅程中的意外插曲，淡定处理。", score: 4 }
    ],
    dimensions: ["A", "C"]
  },
  {
    id: 52,
    text: "你如何看待“极简主义”？",
    options: [
      { text: "觉得是苦行僧生活，完全没乐趣。", score: 1 },
      { text: "觉得很高级，但自己做不到。", score: 2 },
      { text: "尝试精简生活，感觉轻松了很多。", score: 3 },
      { text: "极简是内心的清爽，不被外物定义。", score: 4 }
    ],
    dimensions: ["D", "C"]
  },
  {
    id: 53,
    text: "对于“人工智能绘画/写作”，你的态度是？",
    options: [
      { text: "觉得是垃圾，完全没有灵魂。", score: 1 },
      { text: "觉得很有趣，偶尔玩玩。", score: 2 },
      { text: "尝试将其应用到自己的工作中。", score: 3 },
      { text: "思考人类创造力的本质，探索新的表达方式。", score: 4 }
    ],
    dimensions: ["E", "B"]
  },
  {
    id: 54,
    text: "你如何看待“代沟”？",
    options: [
      { text: "无法逾越的鸿沟，和长辈没法沟通。", score: 1 },
      { text: "正常现象，各过各的就好。", score: 2 },
      { text: "尝试理解不同时代的背景 and 价值观。", score: 3 },
      { text: "在差异中寻找共性，实现跨代际的深度交流。", score: 4 }
    ],
    dimensions: ["B", "D"]
  },
  {
    id: 55,
    text: "面对“网络暴力”，你的反应通常是？",
    options: [
      { text: "跟着一起骂，觉得很解气。", score: 1 },
      { text: "感到恐惧，不敢在网上发言。", score: 2 },
      { text: "理智分析，不盲目跟风。", score: 3 },
      { text: "呼吁理性，关注事件背后的社会问题。", score: 4 }
    ],
    dimensions: ["A", "B"]
  },
  {
    id: 56,
    text: "你如何看待“舒适区”？",
    options: [
      { text: "待着挺好，为什么要出去受罪？", score: 1 },
      { text: "想出去但害怕失败，一直纠结。", score: 2 },
      { text: "定期挑战自己，扩大舒适区的边界。", score: 3 },
      { text: "舒适区是充电站，挑战是成长，两者兼顾。", score: 4 }
    ],
    dimensions: ["C", "D"]
  },
  {
    id: 57,
    text: "对于“名牌” and “奢侈品”，你的态度是？",
    options: [
      { text: "身份的象征，砸锅卖铁也要买。", score: 1 },
      { text: "觉得好看，有钱就买，没钱不强求。", score: 2 },
      { text: "更看重品质 and 设计，不迷信品牌。", score: 3 },
      { text: "物品服务于人，不被品牌溢价绑架。", score: 4 }
    ],
    dimensions: ["D", "B"]
  },
  {
    id: 58,
    text: "你如何看待“元宇宙” and “虚拟现实”？",
    options: [
      { text: "觉得是骗局，完全没兴趣。", score: 1 },
      { text: "觉得很新奇，想去体验一下。", score: 2 },
      { text: "思考其对未来生活方式的改变。", score: 3 },
      { text: "关注其对人类认知 and 存在方式的深远影响。", score: 4 }
    ],
    dimensions: ["E", "D"]
  },
  {
    id: 59,
    text: "面对“离别”，你的心态通常是？",
    options: [
      { text: "痛不欲生，长时间沉溺在悲伤中。", score: 1 },
      { text: "感伤无奈，觉得人生就是不断失去。", score: 2 },
      { text: "珍藏回忆，带着祝福继续前行。", score: 3 },
      { text: "离别是另一种开始，万物皆有其时。", score: 4 }
    ],
    dimensions: ["A", "D"]
  },
  {
    id: 60,
    text: "你认为“活在当下”意味着？",
    options: [
      { text: "今朝有酒今朝醉，不管明天。", score: 1 },
      { text: "尽量享受眼前的快乐。", score: 2 },
      { text: "全神贯注于此时此刻所做的事。", score: 3 },
      { text: "在当下的觉知中，洞察生命的永恒。", score: 4 }
    ],
    dimensions: ["D", "A"]
  }
];

// Helper to get 60 random questions balanced across dimensions
export function getBalancedQuestions(count: number = 60): Type.Question[] {
  const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
