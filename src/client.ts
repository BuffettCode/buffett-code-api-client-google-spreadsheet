import { YearQuarter } from './year-quarter'
import { UrlBuilder } from './url-builder'

export class BuffettCodeApiClientV2 {
  static readonly baseUrl = 'https://api.buffett-code.com/api/v2'

  static readonly quarterPropertyNames = [
    'company_name',
    'ceo_name',
    'headquarters_address',
    'accounting_standard',
    'issued_share_num',
    'treasury_stock_num',
    'employee_num',
    'assets',
    'current_assets',
    'cash_and_deposits',
    'notes_accounts_receivable',
    'notes_receivable',
    'accounts_receivable',
    'inventories',
    'merchandise',
    'work_in_process',
    'raw_materials_and_supplies',
    'non_current_assets',
    'tangible_fixed_assets',
    'liabilities',
    'current_liabilities',
    'notes_accounts_payable',
    'accounts_payable',
    'notes_payable',
    'short_term_bonds_payable',
    'short_term_loans_payable',
    'commercial_papers_liabilities',
    'current_lease_obligations',
    'current_portion_of_long_term_loans',
    'current_portion_of_bonds',
    'current_portion_of_convertible_bonds',
    'current_portion_of_bonds_with_subscription_rights',
    'non_current_liabilities',
    'bonds_payable',
    'convertible_bonds',
    'convertible_bond_type_bonds_with_subscription_rights',
    'non_current_bonds_with_subscription_right',
    'long_term_loans_payable',
    'non_current_lease_obligations',
    'net_assets',
    'shareholders_equity',
    'capital_stock',
    'retained_earnings',
    'treasury_stock',
    'valuation_and_translation_adjustments',
    'non_controlling_interests',
    'subscription_rights',
    'net_sales',
    'cost_of_sales',
    'gross_profit',
    'sga',
    'operating_income',
    'non_operating_income',
    'non_operating_expenses',
    'interest_expense',
    'ordinary_income',
    'extraordinary_income',
    'extraordinary_loss',
    'impairment_loss',
    'income_before_income_taxes',
    'income_taxes',
    'net_income',
    'operating_cash_flow',
    'investment_cash_flow',
    'financial_cash_flow',
    'depreciation',
    'amortization',
    'ex_net_sales',
    'ex_operating_income',
    'ex_ordinary_income',
    'ex_net_income',
    'ex_dividend',
    'dividend',
    'tdnet_title',
    'edinet_title'
  ]

  static readonly indicatorPropertyNames = [
    'stockprice',
    'trading_volume',
    'num_of_shares',
    'market_capital',
    'enterprise_value',
    'eps_forecast',
    'eps_actual',
    'per_forecast',
    'bps',
    'pbr',
    'per_pbr',
    'ebitda_forecast',
    'ebitda_actual',
    'ev_ebitda_forecast',
    'psr_forecast',
    'pcfr_forecast',
    'listed_years',
    'roe',
    'real_roe',
    'net_profit_margin',
    'total_asset_turnover',
    'financial_leverage',
    'roa',
    'roic',
    'ex_dividend',
    'dividend',
    'dividend_yield_forecast',
    'dividend_yield_actual',
    'dividend_payout_ratio',
    'doe',
    'gross_margin',
    'operating_margin',
    'net_sales_operating_cash_flow_ratio',
    'sga_ratio',
    'depreciation_gross_profit_ratio',
    'r_and_d_ratio',
    'interest_op_income_ratio',
    'interest_coverage_ratio',
    'real_corp_tax_rate',
    'net_sales_progress',
    'operating_income_progress',
    'net_income_progress',
    'net_sales_growth_rate_forecast',
    'operating_income_growth_rate_forecast',
    'net_income_growth_rate_forecast',
    'net_sales_per_employee',
    'operating_income_per_employee',
    'trade_receivables',
    'accounts_receivable_turnover',
    'inventories',
    'inventory_turnover',
    'trade_payables',
    'trade_payable_turnover',
    'working_capital',
    'ccc',
    'tangible_fixed_assets_turnover',
    'debt',
    'debt_assets_ratio',
    'debt_monthly_sales_ratio',
    'debt_market_capital_ratio',
    'operating_cash_flow_debt_ratio',
    'net_debt',
    'adjusted_debt_ratio',
    'de_ratio',
    'current_ratio',
    'net_debt_net_income_ratio',
    'equity',
    'equity_ratio',
    'free_cash_flow',
    'cash_market_capital_ratio',
    'cash_assets_ratio',
    'cash_monthly_sales_ratio',
    'accrual'
  ]

  constructor(private _token: string) {}

  static isQuarterProperty(name: string): boolean {
    return BuffettCodeApiClientV2.quarterPropertyNames.indexOf(name) >= 0
  }

  static isIndicatorProperty(name: string): boolean {
    return BuffettCodeApiClientV2.indicatorPropertyNames.indexOf(name) >= 0
  }

  private static request(url: string, options: object): object {
    const res = UrlFetchApp.fetch(url, options)
    return JSON.parse(res.getContentText())
  }

  public quarter(tickers: string, from: YearQuarter, to: YearQuarter): object {
    const endpoint = BuffettCodeApiClientV2.baseUrl + '/quarter'
    const builder = new UrlBuilder(endpoint, { tickers, from, to })
    const url = builder.toString()
    const options = {
      headers: {
        'x-api-key': this._token
      }
    }
    return BuffettCodeApiClientV2.request(url, options)
  }

  public indicator(tickers: string): object {
    const endpoint = BuffettCodeApiClientV2.baseUrl + '/indicator'
    const builder = new UrlBuilder(endpoint, { tickers })
    const url = builder.toString()
    const options = {
      headers: {
        'x-api-key': this._token
      }
    }
    return BuffettCodeApiClientV2.request(url, options)
  }
}
