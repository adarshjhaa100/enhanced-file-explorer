### Enhanced File Explorer - Design Doc


Lightweight, cross-platform(windows, linux, mac) file explorer with advanced features like: directory list export, fast file reader, fast search and much more. 



#### Requirements:

##### Functional:

- Detailed Directory View
- Current View Export
- Advanced Navigation
- File Reader 
- Search (Similar to apple spotlight)
- File Sync Over Network (Maybe)
- Clean UI
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


<strong> Execution Flow for operations </strong>:

![image](https://github.com/adarshjhaa100/enhanced-file-explorer/assets/31096082/36684d33-297f-4099-9acc-be0fbec3e692)


