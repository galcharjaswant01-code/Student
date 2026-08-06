export const THEME_COLORS = {
  'bg-indigo-500': {"50":"oklch(96.2% 0.018 272.314)","100":"oklch(93% 0.034 272.788)","200":"oklch(87% 0.065 274.039)","300":"oklch(78.5% 0.115 274.713)","400":"oklch(67.3% 0.182 276.935)","500":"oklch(58.5% 0.233 277.117)","600":"oklch(51.1% 0.262 276.966)","700":"oklch(45.7% 0.24 277.023)","800":"oklch(39.8% 0.195 277.366)","900":"oklch(35.9% 0.144 278.697)","950":"oklch(25.7% 0.09 281.288)"},
  'bg-blue-500': {"50":"oklch(97% 0.014 254.604)","100":"oklch(93.2% 0.032 255.585)","200":"oklch(88.2% 0.059 254.128)","300":"oklch(80.9% 0.105 251.813)","400":"oklch(70.7% 0.165 254.624)","500":"oklch(62.3% 0.214 259.815)","600":"oklch(54.6% 0.245 262.881)","700":"oklch(48.8% 0.243 264.376)","800":"oklch(42.4% 0.199 265.638)","900":"oklch(37.9% 0.146 265.522)","950":"oklch(28.2% 0.091 267.935)"},
  'bg-emerald-500': {"50":"oklch(97.9% 0.021 166.113)","100":"oklch(95% 0.052 163.051)","200":"oklch(90.5% 0.093 164.15)","300":"oklch(84.5% 0.143 164.978)","400":"oklch(76.5% 0.177 163.223)","500":"oklch(69.6% 0.17 162.48)","600":"oklch(59.6% 0.145 163.225)","700":"oklch(50.8% 0.118 165.612)","800":"oklch(43.2% 0.095 166.913)","900":"oklch(37.8% 0.077 168.94)","950":"oklch(26.2% 0.051 172.552)"},
  'bg-rose-500': {"50":"oklch(96.9% 0.015 12.422)","100":"oklch(94.1% 0.03 12.58)","200":"oklch(89.2% 0.058 10.001)","300":"oklch(81% 0.117 11.638)","400":"oklch(71.2% 0.194 13.428)","500":"oklch(64.5% 0.246 16.439)","600":"oklch(58.6% 0.253 17.585)","700":"oklch(51.4% 0.222 16.935)","800":"oklch(45.5% 0.188 13.697)","900":"oklch(41% 0.159 10.272)","950":"oklch(27.1% 0.105 12.094)"},
  'bg-amber-500': {"50":"oklch(98.7% 0.022 95.277)","100":"oklch(96.2% 0.059 95.617)","200":"oklch(92.4% 0.12 95.746)","300":"oklch(87.9% 0.169 91.605)","400":"oklch(82.8% 0.189 84.429)","500":"oklch(76.9% 0.188 70.08)","600":"oklch(66.6% 0.179 58.318)","700":"oklch(55.5% 0.163 48.998)","800":"oklch(47.3% 0.137 46.201)","900":"oklch(41.4% 0.112 45.904)","950":"oklch(27.9% 0.077 45.635)"},
  'bg-purple-500': {"50":"oklch(97.7% 0.014 308.299)","100":"oklch(94.6% 0.033 307.174)","200":"oklch(90.2% 0.063 306.703)","300":"oklch(82.7% 0.119 306.383)","400":"oklch(71.4% 0.203 305.504)","500":"oklch(62.7% 0.265 303.9)","600":"oklch(55.8% 0.288 302.321)","700":"oklch(49.6% 0.265 301.924)","800":"oklch(43.8% 0.218 303.724)","900":"oklch(38.1% 0.176 304.987)","950":"oklch(29.1% 0.149 302.717)"}
};

export const applyTheme = (themePreference) => {
  const root = document.documentElement;
  if (themePreference === 'dark') {
    root.classList.add('dark');
  } else if (themePreference === 'light') {
    root.classList.remove('dark');
  } else {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
};

export const applyAccentColor = (accentColor) => {
  const root = document.documentElement;
  const colors = THEME_COLORS[accentColor];
  if (colors) {
    Object.keys(colors).forEach(shade => {
      root.style.setProperty(`--color-accent-${shade}`, colors[shade]);
    });
  }
};

export const initTheme = () => {
  const theme = localStorage.getItem('theme') || 'dark';
  const accent = localStorage.getItem('accentColor') || 'bg-indigo-500';
  applyTheme(theme);
  applyAccentColor(accent);
};
