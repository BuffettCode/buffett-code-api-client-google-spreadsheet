module.exports = {
  data: {
    ticker: "2371",
    year: 2022,
    month: 5,
    beta: {
      years_2: {
        start_date: "2020-06-01",
        end_date: "2022-05-31",
        beta: -0.16,
        alpha: -0.01,
        r: -0.19,
        r_squared: 0.04,
        count: 24
      },
      years_3: {
        start_date: "2019-06-01",
        end_date: "2022-05-31",
        beta: 0.07,
        alpha: 0.0,
        r: 0.11,
        r_squared: 0.01,
        count: 36
      },
      years_5: {
        start_date: "2017-06-01",
        end_date: "2022-05-31",
        beta: 0.12,
        alpha: 0.0,
        r: 0.19,
        r_squared: 0.04,
        count: 60
      }
    },
    kpi: [{
      name: "全店 売上（円）",
      value: 3477000000.0
    }]
  },
  column_description: {
    ticker: {
      name_jp: "ティッカー",
      unit: "なし"
    },
    year: {
      name_jp: "年",
      unit: "なし"
    },
    month: {
      name_jp: "月",
      unit: "なし"
    },
    beta: {
      years_2: {
        start_date: {
          name_jp: "開始日",
          unit: "日付"
        },
        end_date: {
          name_jp: "終了日",
          unit: "日付"
        },
        beta: {
          name_jp: "β",
          unit: "なし"
        },
        alpha: {
          name_jp: "α",
          unit: "なし"
        },
        r: {
          name_jp: "相関係数",
          unit: "なし"
        },
        r_squared: {
          name_jp: "決定係数",
          unit: "なし"
        },
        count: {
          name_jp: "利用データ数",
          unit: "個"}
      },
      years_3: {
        start_date: {
          name_jp: "開始日",
          unit: "日付"
        },
        end_date: {
          name_jp: "終了日",
          unit: "日付"
        },
        beta: {
          name_jp: "β",
          unit: "なし"
        },
        alpha: {
          name_jp: "α",
          unit: "なし"
        },
        r: {
          name_jp: "相関係数",
          unit: "なし"
        },
        r_squared: {
          name_jp: "決定係数",
          unit: "なし"
        },
        count: {
          name_jp: "利用データ数",
          unit: "個"
        }
      },
      years_5: {
        start_date: {
          name_jp: "開始日",
          unit: "日付"
        },
        end_date: {
          name_jp: "終了日",
          unit: "日付"
        },
        beta: {
          name_jp: "β",
          unit: "なし"
        },
        alpha: {
          name_jp: "α",
          unit: "なし"
        },
        r: {
          name_jp: "相関係数",
          unit: "なし"
        },
        r_squared: {
          name_jp: "決定係数",
          unit: "なし"
        },
        count: {
          name_jp: "利用データ数",
          unit: "個"
        }
      }
    },
    kpi: {
      name: {
        name_jp: "指標",
        unit: "なし"
      },
      value: {
        name_jp: "値",
        unit: "指標による"
      }
    }
  }
}
