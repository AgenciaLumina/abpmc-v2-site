interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({
  title,
  description = 'Nenhum conteúdo disponível no momento.',
  icon,
  action,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`text-center p-8 md:p-12 rounded-xl bg-white shadow-md ${className}`}>
      {icon && (
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 text-blue-600 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-500 max-w-md mx-auto mb-6">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
