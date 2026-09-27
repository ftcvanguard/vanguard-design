<script lang="ts">
  import { Accordion, Badge, Tabs } from '$lib/index.js'
  import Example from '../_demo/Example.svelte'
  import Section from '../_demo/Section.svelte'

  let tab = $state('schedule')
</script>

<Section
  id="tabs"
  title="Tabs"
  primitive="Tabs"
  description="Switch between related panels without leaving the page. The underline marks the active tab, as in Vanguard 1.0's admin nav; counts summarize what's inside. Arrow keys move between tabs."
>
  <Example title="Try it" note="Active: {tab}">
    <Tabs.Root bind:value={tab}>
      <Tabs.List>
        <Tabs.Trigger value="schedule" icon="calendar">Schedule</Tabs.Trigger>
        <Tabs.Trigger value="rankings" icon="trophy" count={32}>Rankings</Tabs.Trigger>
        <Tabs.Trigger value="notes" icon="notebook-pen" count={4}>Notes</Tabs.Trigger>
        <Tabs.Trigger value="insights" icon="bar-chart" disabled>Insights</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="schedule"><p class="text-fg-muted">Qualification matches for today, in order.</p></Tabs.Content>
      <Tabs.Content value="rankings"><p class="text-fg-muted">32 teams, sorted by ranking points.</p></Tabs.Content>
      <Tabs.Content value="notes"><p class="text-fg-muted">4 teams still need scouting notes.</p></Tabs.Content>
    </Tabs.Root>
  </Example>
  <Example title="Trigger states" note="Default · hover · focus · active · disabled">
    <Tabs.Root value="active">
      <Tabs.List>
        <Tabs.Trigger value="default">Default</Tabs.Trigger>
        <Tabs.Trigger value="hover" data-force-state="hover">Hover</Tabs.Trigger>
        <Tabs.Trigger value="focus" data-force-state="focus">Focus</Tabs.Trigger>
        <Tabs.Trigger value="active" count={3}>Active</Tabs.Trigger>
        <Tabs.Trigger value="disabled" disabled>Disabled</Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  </Example>
</Section>

<Section
  id="accordion"
  title="Accordion"
  primitive="Accordion"
  description="Stacked sections that expand in place, for secondary detail people only sometimes need. Don't hide anything required to finish a task."
>
  <div class="grid gap-6 lg:grid-cols-2">
    <Example title="Single" note="One section open at a time.">
      <Accordion.Root type="single" value="auto">
        <Accordion.Item value="auto" title="Autonomous">
          Scored 2 specimens and parked. Consistent across 5 matches.
        </Accordion.Item>
        <Accordion.Item value="teleop" title="Driver-controlled">
          Averages 8 samples in the high basket. Slow on transfers.
        </Accordion.Item>
        <Accordion.Item value="endgame" title="Endgame">
          Level 2 ascent in 4 of 5 matches.
        </Accordion.Item>
      </Accordion.Root>
    </Example>
    <Example title="Multiple, with meta and disabled">
      <Accordion.Root type="multiple" value={['penalties']}>
        <Accordion.Item value="penalties" title="Penalties">
          {#snippet meta()}<Badge tone="danger" size="sm">3</Badge>{/snippet}
          Two minor, one major (pinning) in match 14.
        </Accordion.Item>
        <Accordion.Item value="notes" title="Pit notes">
          {#snippet meta()}<Badge tone="success" size="sm">Updated</Badge>{/snippet}
          New intake since the last event.
        </Accordion.Item>
        <Accordion.Item value="video" title="Match video" disabled>Not recorded.</Accordion.Item>
      </Accordion.Root>
    </Example>
  </div>
</Section>
