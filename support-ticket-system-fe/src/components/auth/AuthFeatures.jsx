import { CheckIcon } from '../../assets/icons';

const AuthFeatureItem = ({ icon, text, colorClass }) => (
  <div className="flex items-center space-x-4">
    <div className={`flex-shrink-0 w-10 h-10 ${colorClass} rounded-full flex items-center justify-center`}>
      {icon}
    </div>
    <span className="text-gray-700 text-lg">{text}</span>
  </div>
);

const AuthFeatures = ({ features }) => (
  <div className="space-y-4 pt-8">
    {features.map((feature, index) => (
      <AuthFeatureItem 
        key={index} 
        icon={<CheckIcon className="w-5 h-5" style={{ color: feature.iconColor }} />}
        text={feature.text}
        colorClass={feature.bgColor}
      />
    ))}
  </div>
);

export default AuthFeatures;
