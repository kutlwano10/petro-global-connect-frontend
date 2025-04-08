'use client';

import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { DailyBanking, BankStatement } from '@/interfaces/banking/banking';

interface BankReconciliationProps {
  bankings: DailyBanking[];
  bankStatements: BankStatement[];
  onMatch: (bankingId: string, statementId: string) => void;
  onUnmatch: (bankingId: string) => void;
}

export function BankReconciliation({ 
  bankings, 
  bankStatements, 
  onMatch, 
  onUnmatch 
}: BankReconciliationProps) {
  // Find unmatched bankings and statements
  const unmatchedBankings = bankings.filter(b => !b.verified);
  const unmatchedStatements = bankStatements.filter(bs => 
    !bankings.some(b => b.bankStatementMatch?.reference === bs.reference)
  );

  // Auto-match potential matches
  const potentialMatches = unmatchedBankings.flatMap(banking => {
    return unmatchedStatements
      .filter(statement => 
        Math.abs(statement.amount - (banking.cashAmount + banking.cardAmount)) < 0.01 && // Amount matches
        statement.bankName === banking.bankName // Same bank
      )
      .map(statement => ({ banking, statement }));
  });

  return (
    <div className="mt-8 bg-surface text-text rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Bank Reconciliation</h3>
        <p className="text-sm text-gray-500">
          Match manager deposits with bank statements
        </p>
      </div>

      {/* Potential Auto-Matches */}
      {potentialMatches.length > 0 && (
        <div className="p-4 bg-blue-50 border-b">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-blue-800">
              Suggested Matches ({potentialMatches.length})
            </h4>
            <button 
              onClick={() => potentialMatches.forEach(({ banking, statement }) => 
                onMatch(banking.id, statement.id)
              )}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <ArrowPathIcon className="h-4 w-4" />
              <span>Match All</span>
            </button>
          </div>

          <div className="space-y-2">
            {potentialMatches.map(({ banking, statement }) => (
              <div key={`${banking.id}-${statement.id}`} className="flex items-center justify-between p-2 bg-white rounded border">
                <div>
                  <p className="font-medium">{banking.reference}</p>
                  <p className="text-sm text-gray-500">
                    {banking.bankName} • {formatDate(banking.date)} • 
                    R{(banking.cashAmount + banking.cardAmount).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => onMatch(banking.id, statement.id)}
                  className="p-1 text-green-600 hover:text-green-800"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Reconciliation */}
      <div className="p-4">
        <h4 className="font-medium mb-3">Manual Reconciliation</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Unmatched Deposits */}
          <div>
            <h5 className="text-sm font-medium text-gray-500 mb-2">
              Unmatched Deposits ({unmatchedBankings.length})
            </h5>
            <div className="space-y-2">
              {unmatchedBankings.map(banking => (
                <div 
                  key={banking.id} 
                  className="p-3 bg-gray-50 rounded-lg border"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{banking.reference}</p>
                      <p className="text-sm text-gray-500">
                        {banking.bankName} • {banking.accountNumber.slice(-4)} • 
                        R{(banking.cashAmount + banking.cardAmount).toFixed(2)}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                      Unmatched
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unmatched Statements */}
          <div>
            <h5 className="text-sm font-medium text-gray-500 mb-2">
              Unmatched Bank Transactions ({unmatchedStatements.length})
            </h5>
            <div className="space-y-2">
              {unmatchedStatements.map(statement => (
                <div 
                  key={statement.id} 
                  className="p-3 bg-gray-50 rounded-lg border"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{statement.description}</p>
                      <p className="text-sm text-gray-500">
                        {statement.bankName} • {formatDate(statement.transactionDate)} • 
                        R{statement.amount.toFixed(2)}
                      </p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                      Pending
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}