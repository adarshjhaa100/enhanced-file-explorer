### Enhanced File Explorer - Design Doc


Lightweight, cross-platform(windows, linux, mac) file explorer with advanced features like: directory list export, fast file reader, fast search and much more. 



#### Requirements:

##### Functional:

- Detailed Directory View
- Current View Export (could be automated)
- Search (Similar to apple spotlight)
- File Reader (Large File)
- Bookmarks - Show shortcut in the directory pane/home ( Favourites )
- Map keyboard shortcuts with programs(like opening bash), Toolbar like weapon wheel in games
- Multi Window (v2)
- Tabbed Window (v2)
- File Sync Over Network (Maybe)
- Clean UI
- Advanced Navigation (Need to figure out what is it supposed to be)
- Chat with files ( using LLM )
- Embedded Terminal
- Enhanced toolbar (bookmark, search etc. present with context menu and shortcut key)
- Programmable and customizable
<br/>

##### Technical Functional:
- Cross-Platform
- Reader with - advanced parsing functionalities for fixed width, delimited etc. 
- Read, Process, Search big files with low memory consumption 
- Faster Search - Compared to current systems
- "Cache" : operations w/ long processing time for faster reload
- Pipelining | Queueing long running operations


#### Technology Stack
<strong> Platform </strong>: Windows, Mac, Linux <br/>
<strong> Tools and Framework </strong>: Rust, TypeScript, React, HTML, CSS, JS <br/>
<strong> Communication </strong>: Inter-process, FTP/HTTP, Asynchronous Message Passing


#### High Level Design

<strong> Overview </strong>

![image](https://github.com/adarshjhaa100/enhanced-file-explorer/assets/31096082/fdf71f02-1488-4b3b-b59f-2bd99e5f8579)


<strong> Frontend Design : For explorer - V1 </strong>
![image](https://github.com/adarshjhaa100/enhanced-file-explorer/assets/31096082/0883b08f-20e9-4760-8af2-dad1bd47f673)




<strong> Execution Flow for operations </strong>:

![image](https://github.com/adarshjhaa100/enhanced-file-explorer/assets/31096082/36684d33-297f-4099-9acc-be0fbec3e692)


