import {
  Activity,
  BarChart3,
  CircleDot,
  ClipboardList,
  Dumbbell,
  Film,
  Flag,
  Gauge,
  Goal,
  LineChart,
  Map,
  Play,
  Radar,
  Search,
  ShieldCheck,
  Target,
  Timer,
  TrendingUp,
  Users,
  Video,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const matchMetrics = [
  { label: 'xG For', value: '2.14', delta: '+0.42', icon: Target },
  { label: 'High Regains', value: '11', delta: '+4', icon: Gauge },
  { label: 'Final 3rd Entries', value: '48', delta: '+13%', icon: Flag },
  { label: 'PPDA', value: '7.8', delta: '-1.9', icon: Activity },
];

const momentum = [
  { minute: '0', home: 0.06, opponent: 0.03 },
  { minute: '10', home: 0.18, opponent: 0.08 },
  { minute: '20', home: 0.34, opponent: 0.21 },
  { minute: '30', home: 0.48, opponent: 0.31 },
  { minute: '40', home: 0.72, opponent: 0.36 },
  { minute: 'HT', home: 0.91, opponent: 0.39 },
  { minute: '55', home: 1.14, opponent: 0.53 },
  { minute: '65', home: 1.28, opponent: 0.83 },
  { minute: '75', home: 1.76, opponent: 0.91 },
  { minute: '90', home: 2.14, opponent: 1.05 },
];

const phaseData = [
  { phase: 'Build-up', success: 82, benchmark: 76 },
  { phase: 'Progression', success: 68, benchmark: 63 },
  { phase: 'Chance Creation', success: 44, benchmark: 38 },
  { phase: 'Counter Press', success: 61, benchmark: 55 },
  { phase: 'Rest Defence', success: 74, benchmark: 70 },
];

const playerLoad = [
  { player: 'A. Singh', distance: 9.8, sprint: 22, readiness: 91 },
  { player: 'R. Das', distance: 10.6, sprint: 27, readiness: 86 },
  { player: 'N. Kumar', distance: 8.9, sprint: 18, readiness: 94 },
  { player: 'M. Rao', distance: 11.2, sprint: 31, readiness: 79 },
  { player: 'I. Khan', distance: 9.4, sprint: 21, readiness: 88 },
];

const possession = [
  { name: 'Controlled Build', value: 34, color: '#146c5f' },
  { name: 'Fast Attack', value: 18, color: '#f4a261' },
  { name: 'Set Plays', value: 12, color: '#4374b8' },
  { name: 'Defensive Phase', value: 36, color: '#d95f59' },
];

const events = [
  { time: "08'", tag: 'Pressing trap', note: 'Right winger curves run to force pass into touchline zone.' },
  { time: "23'", tag: 'Line break', note: 'No. 6 receives behind first line and releases left half-space.' },
  { time: "41'", tag: 'Set play', note: 'Near-post screen creates free header at penalty spot.' },
  { time: "63'", tag: 'Transition risk', note: 'Both fullbacks advanced; rest defence left 2v2 centrally.' },
  { time: "78'", tag: 'Goal sequence', note: 'High regain, third-man run, cutback finish inside six-yard box.' },
];

const scouting = [
  'Opponent fullbacks jump early; diagonal switches isolate weak-side winger.',
  'No. 10 drops into right pocket and attracts the holding midfielder.',
  'Goalkeeper prefers clipped pass to left centre-back under pressure.',
  'Defensive line holds high after turnovers; space appears behind left channel.',
];

const shotPoints = [
  { x: 78, y: 45, size: 18, type: 'goal' },
  { x: 67, y: 34, size: 12, type: 'shot' },
  { x: 84, y: 54, size: 14, type: 'shot' },
  { x: 59, y: 48, size: 9, type: 'shot' },
  { x: 73, y: 62, size: 11, type: 'shot' },
  { x: 88, y: 38, size: 10, type: 'shot' },
];

function KpiCard({ label, value, delta, icon: Icon }: (typeof matchMetrics)[number]) {
  return (
    <article className="kpi-card">
      <div className="kpi-icon">
        <Icon size={20} />
      </div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
      <span>{delta}</span>
    </article>
  );
}

function PitchMap() {
  return (
    <section className="panel pitch-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Tactical Map</span>
          <h2>Shot quality and recovery zones</h2>
        </div>
        <button className="icon-button" aria-label="Open pitch map tools" title="Map tools">
          <Map size={18} />
        </button>
      </div>
      <div className="pitch" aria-label="Football pitch showing shot locations">
        <div className="pitch-box pitch-box-left" />
        <div className="pitch-box pitch-box-right" />
        <div className="pitch-centre" />
        <div className="press-zone">press trap</div>
        <div className="chance-zone">chance zone</div>
        {shotPoints.map((point, index) => (
          <span
            className={`shot-point ${point.type}`}
            key={`${point.x}-${point.y}-${index}`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              width: point.size,
              height: point.size,
            }}
          />
        ))}
      </div>
    </section>
  );
}

export function App() {
  return (
    <main className="app-shell">
      <aside className="sidebar" aria-label="Dashboard navigation">
        <div className="brand">
          <div className="brand-mark">
            <CircleDot size={24} />
          </div>
          <div>
            <strong>MatchLab</strong>
            <span>Performance Analysis</span>
          </div>
        </div>
        <nav>
          {[
            [BarChart3, 'Overview'],
            [Video, 'Video Tags'],
            [Radar, 'Opposition'],
            [Users, 'Players'],
            [ShieldCheck, 'AMS'],
          ].map(([Icon, label]) => (
            <a href={`#${String(label).toLowerCase().replace(' ', '-')}`} key={String(label)}>
              <Icon size={18} />
              {String(label)}
            </a>
          ))}
        </nav>
        <div className="analyst-card">
          <Film size={22} />
          <strong>AIFF-FIFA Odisha Talent Academy</strong>
          <span>Role focus: tactical planning, video evidence, player development.</span>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <span className="eyebrow">Post-match report</span>
            <h1>India U17 Academy vs Coastal XI</h1>
            <p>Actionable football insights for coaches, players, and performance staff.</p>
          </div>
          <div className="topbar-actions">
            <button className="ghost-button">
              <Search size={18} />
              Archive
            </button>
            <button className="primary-button">
              <Play size={18} />
              Review Clips
            </button>
          </div>
        </header>

        <section className="score-strip" id="overview">
          <div>
            <span>Final Score</span>
            <strong>3 - 1</strong>
            <p>Goals: 18', 52', 78'</p>
          </div>
          <div>
            <span>Analysis Window</span>
            <strong>22 May - 10 Jun 2026</strong>
            <p>Application-ready portfolio project</p>
          </div>
          <div>
            <span>Primary Objective</span>
            <strong>Win the middle third</strong>
            <p>Recover, switch, attack weak side</p>
          </div>
        </section>

        <section className="kpi-grid">
          {matchMetrics.map((metric) => (
            <KpiCard {...metric} key={metric.label} />
          ))}
        </section>

        <section className="dashboard-grid">
          <PitchMap />

          <section className="panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">xG Momentum</span>
                <h2>Chance value over time</h2>
              </div>
              <LineChart size={20} />
            </div>
            <div className="chart tall">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={momentum}>
                  <defs>
                    <linearGradient id="homeGradient" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#146c5f" stopOpacity={0.55} />
                      <stop offset="95%" stopColor="#146c5f" stopOpacity={0.04} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9e1dc" />
                  <XAxis dataKey="minute" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Area dataKey="home" stroke="#146c5f" fill="url(#homeGradient)" strokeWidth={3} />
                  <Area dataKey="opponent" stroke="#d95f59" fill="transparent" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Phase Review</span>
                <h2>Game model execution</h2>
              </div>
              <TrendingUp size={20} />
            </div>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={phaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9e1dc" />
                  <XAxis dataKey="phase" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="success" fill="#146c5f" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="benchmark" fill="#f4a261" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Possession Profile</span>
                <h2>How the match was spent</h2>
              </div>
              <Timer size={20} />
            </div>
            <div className="donut-wrap">
              <div className="donut-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={possession} innerRadius={58} outerRadius={86} paddingAngle={5} dataKey="value">
                      {possession.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="legend-list">
                {possession.map((item) => (
                  <span key={item.name}>
                    <i style={{ background: item.color }} />
                    {item.name} <strong>{item.value}%</strong>
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="panel wide" id="video-tags">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Video Tagging</span>
                <h2>Searchable clip queue</h2>
              </div>
              <ClipboardList size={20} />
            </div>
            <div className="event-list">
              {events.map((event) => (
                <article key={event.time}>
                  <time>{event.time}</time>
                  <div>
                    <strong>{event.tag}</strong>
                    <p>{event.note}</p>
                  </div>
                  <button className="icon-button" aria-label={`Play clip from ${event.time}`} title="Play clip">
                    <Play size={16} />
                  </button>
                </article>
              ))}
            </div>
          </section>

          <section className="panel" id="opposition">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Opposition</span>
                <h2>Pre-match scouting notes</h2>
              </div>
              <Radar size={20} />
            </div>
            <ul className="scouting-list">
              {scouting.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="panel wide" id="players">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Player Development</span>
                <h2>Load, sprint exposure, and readiness</h2>
              </div>
              <Dumbbell size={20} />
            </div>
            <div className="chart">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart data={playerLoad}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9e1dc" />
                  <XAxis dataKey="player" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line dataKey="readiness" stroke="#146c5f" strokeWidth={3} dot={{ r: 5 }} />
                  <Line dataKey="sprint" stroke="#d95f59" strokeWidth={3} dot={{ r: 5 }} />
                  <Line dataKey="distance" stroke="#4374b8" strokeWidth={3} dot={{ r: 5 }} />
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="panel" id="ams">
            <div className="panel-heading">
              <div>
                <span className="eyebrow">Coach Actions</span>
                <h2>Next session priorities</h2>
              </div>
              <Goal size={20} />
            </div>
            <div className="action-stack">
              <article>
                <strong>Unit work</strong>
                <p>Back four rest-defence spacing after wide overloads.</p>
              </article>
              <article>
                <strong>Individual clip</strong>
                <p>No. 8 body shape before receiving under pressure.</p>
              </article>
              <article>
                <strong>Training design</strong>
                <p>6v4 counter-press game with timed weak-side switches.</p>
              </article>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
