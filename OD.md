# Relevant Experience
THe following is a quick, dot point summary of the experience i think is of particular interest for Octopus Deploy

## Apps I have built with similar semantics ##
  - **NetMAARS Sync Service:** a critical infrastructure component with 99.9% SLA. Was used to migrate the NetMAARS prod database (+50gb) to the report server each day and optimise it for consumption 
    1. Allowed users to compose a set of actions together. Actions were pluggable, *ie. run .exe, backup/restore SQL database, rebuild indexes,  assign permissions, stop/start services*
    2. Had basic workflow for each action *ie. if an action failed, the next action was not executed*
  
  - **RedRain Auto-Update & AppStatus:** monitored all apps on client computers for status, and allowed them to be updated on demand via TFS CI. Used across all apps and services that RedRain created including mobile 
    1. A *heartbeat service* which pinged a central server every 10 minutes and relayed critical information for monitoring. Charts in a support portal would show display this information to support staff.
    2. A *error reporting service* which sent errors, stack traces and logs automatically in real-time to the central server
    3. A *command service*, including
        - *Stop/Start/Restart*: orchestrated by a process supervisor
        - *Update*: sent a new version of the app down to the client, and then restarted the app at this new version. had a failover mode, which would roll-back if the new version didnt install properly or threw errors on startup
        - *UploadLog <date>*: uploads extra debugging information to the central server for a period of time
        - *Install*: runs the apps installation process 
    4. An *always online supervisor* which monitored the app and relaunched if it terminated for any reason. 
    5. Integrated with TFS pipeline to only publish new app updates if CI passed. TFS versioned all the assemblies such that the deployed build could be traced back to the exact source code.
  
  - **AdaptiveScheduler:** designed to orchestrate our sync process with systems we integrated with, but was flexible enough to use as a general workflow / task framework
    1. Ran any number of task-groups that could be scheduled in a flexible manner
    2. Each task in a task-group supports various workflow semantics; 
        - read/write to shared state
        - run based on execution conditions (pre/post)
        - run as sync/async 
        - wait for other tasks/groups to complete before continuing
        - run other task-groups and various other flexible, fault tolerant composition methods
    3. Tasks were pluggable and extendable    
        - *SQLTask, StoredProcTask, FileCopyTask, DeleteTask, UnZipTask etc*
    4. Fully configurable dynamically with JSON or statically with Fluent objects
    5. Supported sliding schedules, so if a task was scheduled every 15 minutes, and it took 10 minutes to run, it would only run again in another 15 minutes.
    6. Was flexible and lightweight enough to be used anywhere required, even on the mobile.

## Mature Spidey Senses ##
- **Worked with computers since age 13**: Before that I pulled apart all my toys, built dick-smith electronic kits and lego. At 16, started my first computer consulting business.
- **Ex-Hacker**: One of my first passions was networked computers, and after learning C at university, computer security became something I wanted to know the in's and outs of so I could build secure apps. One of the first apps I built with Java was a IP scanner, which I programmed with various exploits to find vulnerable computers. I would then penetrate them for the challenge. After uni, I worked on restricted and secure networks with DoD, and software I built was
- **Methodical problem solver**: Just like an air-crash investigation, debugging issues with code and all its dependencies is a process of elimination. My broad knowledge of computers & the way they work helps me isolate and solve obscure bugs  
- **Rolling-Refactoring**: Code-bases are constantly evolving and managing technical debt is crucial to long term velocity of a product. Technical debt is a trade-off, knowing when its time to refactor it is key.
- **Assessing trade-offs**: *It depends! Anything is possible... Should we use that new library? How many objects can I store in this list? Should I unit test this?* I love to debate the technical merits of approaches and develop solutions that are aligned with the users expectations, and conforming to technical patterns. No one approach is the silver bullet, all variables must be assessed and ranked in order to find the right trade-off.
- **Good running knowledge of design patterns**: Its most likely been done before, don't reinvent the wheel, and apply it properly.
- **Code metrics**: Pre-mature optimisation is bad, but but once you need to, having good measurements is key. Understanding hot-paths, having a good baseline, and repeatable automated tests is key to maintaining performance goals over the long term.

## Experience in a variety of environments ##
- While C# is my specialisation, ive built software in a variety of languages on a variety of platforms. Java, JS, C/C++, Unix, Linux, Windows, iOS..
- Ive integrated C# with a variety of platforms using various methods of interop (PInvoke, Remoting, WebAPIs, Data Extracts, Message passing). One notable example was extracting data from a custom built closed source systems created specifically for DoD where decompiled code was my only documentation.
- Building APIs for these wrappers/adapters that are unit tested, leak free and are to be consumed as part of library using the correct domain language.
- Building software for multi-tenant environments, and keeping data segregated to comply with various standards.
