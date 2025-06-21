const OnboardingWrapper = () => {
  const navigate = useNavigate();

  return (
    <Onboarding
      onComplete={(role) => {
        navigate("/", { state: { role } }); // 👈 BACK TO INDEX
      }}
    />
  );
};
